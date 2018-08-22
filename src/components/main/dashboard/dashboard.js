import './dashboard.scss';
import template from './dashboard.html';

import '../../../images/hero-bg1.jpg';
import '../../../images/wlm-logo.png';
import pack from '../../../../package.json';

const DashboardComponent = { controller, template };

function controller($filter, $mdToast, $state, $window, WikiService, langService, mapService, wikidata) {
  const vm = this;
  const langs = langService.getUserLanguages();

  vm.getImage = getImage;
  vm.lang = {};
  vm.languagesList = langService.getLanguagesList();
  vm.languages = langService.getUserLanguages();
  vm.loading = false;
  vm.saveUserLanguages = saveUserLanguages;
  vm.searchLang = text => $filter('filter')(vm.languagesList, text);
  vm.setLanguage = (lang) => { vm.languages.push(lang.code); };

  vm.getMatches = getMatches;
  vm.goToMap = goToMap;

  init();

  function init() {
    $window.document.title = 'Dashboard – Wiki Loves Monuments Map';

    vm.config = {
      env: $window.__env,
      package: pack,
    };

    // getNearestMonuments();
  }

  function getMatches(input) {
    if (!input) {
      return null;
    }
    return mapService.getCity(input).then(data => data.data
      .filter(item => item.class !== 'boundary')
      .map((item) => {
        const name = item.display_name.split(', ')[0];
        return {
          name,
          details: item.display_name.substring(name.length + 1),
          lat: item.lat,
          lon: item.lon,
        };
      }));
  }

  function goToMap() {
    const lat = parseFloat(vm.selectedItem.lat).toFixed(4);
    const lon = parseFloat(vm.selectedItem.lon).toFixed(4);
    const c = `${lat}:${lon}:15`;
    $state.go('main.map', { c });
  }

  function geolocSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const request = wikidata.getSPARQL(`SELECT ?place ?placeLabel ?dist (SAMPLE(?image) AS ?image)
      WHERE
      {
        SERVICE wikibase:around {
            ?place wdt:P625 ?location .
            bd:serviceParam wikibase:center "Point(${longitude} ${latitude})"^^geo:wktLiteral .
            bd:serviceParam wikibase:radius "10" .
        }
        ?place wdt:P1435 ?monument .
        OPTIONAL { ?place wdt:P18 ?image . }
        SERVICE wikibase:label { bd:serviceParam wikibase:language "${langs.map(lang => lang.code).join(',')}" }
        BIND(geof:distance("Point(${longitude} ${latitude})"^^geo:wktLiteral, ?location) as ?dist) 
      }
      GROUP BY ?place ?placeLabel ?dist
      ORDER BY ?dist`);
    request.then((data) => {
      vm.nearby = data.slice(0, 15).map(item => ({
        id: item.place.value.substring(32),
        name: item.placeLabel.value,
        imageName: item.image ? item.image.value.substring(51) : undefined,
        distance: item.dist.value,
      }));
    });
  }

  function getImage(item) {
    if (!item.imageName) { return; }
    WikiService.getImage(decodeURIComponent(item.imageName), { iiurlwidth: 640 }).then((response) => {
      item.image = response.imageinfo;
    });
  }

  function getNearestMonuments() {
    navigator.geolocation.getCurrentPosition(geolocSuccess, () => {
      vm.nearby = 'error';
    });
  }

  function saveUserLanguages() {
    langService.setUserLanguages(vm.languages)
      .then(() => {
        $mdToast.show($mdToast.simple().textContent('Languages saved!').hideDelay(3000));
        $state.reload();
      });
  }
}

export default () => {
  angular
    .module('monumental')
    .component('moDashboard', DashboardComponent);
};
