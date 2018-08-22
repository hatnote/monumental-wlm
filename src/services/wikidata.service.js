import _ from 'lodash';

const wdService = function ($http, $q, langService) {
  const service = {
    get,
    getById,
    getLabels,
    getLocation,
    getRecursive,
    getSearch,
    getSPARQL,
  };

  const defaultParams = {
    action: 'wbgetentities',
    format: 'json',
    props: ['info', 'labels', 'aliases', 'descriptions', 'claims', 'datatype', 'sitelinks'],
    languages: langService.getUserLanguages().map(lang => lang.code),
    callback: 'JSON_CALLBACK',
  };

  function findProp(thing, array) {
    if (angular.isArray(thing)) {
      thing.forEach(element => findProp(element, array));
    } else if (angular.isObject(thing)) {
      thing.datatype === 'wikibase-item' && thing.datavalue
        ? array.push(thing.datavalue.value.id)
        : _.forOwn(thing, value => findProp(value, array));
    }
  }

  /**
   * 
   * @param {Object} data
   * @returns {Promise}
   */
  function get(data) {
    const params = angular.extend({}, defaultParams, data);
    return $http.jsonp('https://www.wikidata.org/w/api.php', {
      params: mapValues(params, p => angular.isArray(p) ? p.join('|') : p),
      cache: false,
    }).then(response => response.data);
  }

  function getLabels(ids, lang) {
    const promises = [];
    const languages = lang ? lang.join('|') : defaultParams.languages;
    for (let i = 0; i < Math.ceil(ids.length / 50); i += 1) {
      promises.push(get({
        ids: ids.slice(i * 50, ((i + 1) * 50) - 1),
        props: ['labels'],
        languages,
      }));
    }
    return $q.all(promises).then((responses) => {
      const result = {};
      responses.forEach((response) => {
        const values = mapValues(response.entities, entity => simplifyLabels(entity.labels));
        angular.extend(result, values);
      });
      return result;
    });
  }

  function getRecursive(element, recursiveProperty) {
    const query = `SELECT ?parent ?parentLabel WHERE {
        wd:${element} ${recursiveProperty}* ?parent .
        SERVICE wikibase:label { bd:serviceParam wikibase:language "${defaultParams.languages.join(', ')}" }
      }`;
    return getSPARQL(query).then(data => data.map((element) => ({
      link: element.parent.value.replace('entity', 'wiki'),
      value_id: element.parent.value.substring(element.parent.value.indexOf('/Q') + 1),
      value: element.parentLabel.value,
    })));
  }


  function getLocation(element) {
    const query = `SELECT ?parent ?parentLabel ?superParent WHERE {
      hint:Query hint:optimizer "None".
      wd:${element} wdt:P131* ?parent.
      MINUS { ?parent wdt:P576|wdt:P582 []. }
      OPTIONAL {
        ?parent wdt:P131 ?superParent.
        MINUS { ?superParent wdt:P576|wdt:P582 []. }
      }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "${defaultParams.languages.join(', ')}" }
    }`;
    return getSPARQL(query)
      .then(data => data.map(elem => ({
        link: elem.parent.value.replace('entity', 'wiki'),
        value_id: elem.parent.value.substring(elem.parent.value.indexOf('/Q') + 1),
        value: elem.parentLabel.value,
        next: elem.superParent ? elem.superParent.value.substring(elem.superParent.value.indexOf('/Q') + 1) : undefined,
      })))
      .then((data) => {
        const list = [];
        const country = data.filter(elem => !elem.next)[0];
        pushToList(data, country, list);
        return list.reverse();
      });
  }

  function pushToList(data, element, list) {
    list.push(element);
    const next = data.filter(elem => elem.next === element.value_id);
    if (next.length) {
      pushToList(data, next[0], list);
    }
  }


  function getSearch(text) {
    return get({
      action: 'wbsearchentities',
      search: text,
      type: 'item',
      language: defaultParams.languages[0],
      uselang: defaultParams.languages[0],
    }).then(response => response.search);
  }

  function getSPARQL(query, params) {
    return $http.get('https://query.wikidata.org/sparql', angular.extend({}, {
      params: { query: query.replace(/ {2,}/g, ' ') },
      cache: false,
    }, params)).then(data => data.data.results.bindings);
  }

  /**
   * Creates an object with the same keys as `object` and values generated
   * by running each own enumerable string keyed property of `object` thru
   * `func`.
   * 
   * @param {Object} object The object to iterate over
   * @param {Function} func The function invoked per iteration
   * @returns {Object} Returns the new mapped object
   */
  function mapValues(object, func) {
    let key, result = {};
    for (key in object) {
      if (!object.hasOwnProperty(key)) { continue; }
      result[key] = func.call(object, object[key], key);
    }
    return result;
  }

  function simplifyLabels(labels) {
    return mapValues(labels, label => label.value);
  }

  // function getIDs

  function getById(id) {
    let data = {};
    const ids = [];

    return get({
      ids: id,
      languages: undefined,
    })
      .then((response) => {
        data = _.sample(response.entities);
        findProp(response, ids);

        const lang = defaultParams.languages;
        if (data.claims.P17) {
          const countryId = data.claims.P17[0].mainsnak.datavalue.value.id;
          lang.push(...langService.getNativeLanguages(countryId));
        }
        return { ids, lang };
      })
      .then((response) => {
        const unique = _.uniq(response.ids);
        return getLabels(unique, response.lang);
      })
      .then((valuesLabels) => {
        angular.extend(data, { valuesLabels });
        return data;
      });
  }

  return service;
};

export default () => {
  angular
    .module('monumental')
    .factory('wikidata', wdService);
};
