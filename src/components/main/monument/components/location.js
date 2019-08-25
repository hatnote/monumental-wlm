const LocationComponent = {
  bindings: {
    monument: "=",
    params: "=",
    lang: "="
  },
  controller,
  template: `<div layout="row" layout-align="start center">
              <span><md-icon>location_city</md-icon></span>
              <span>
                <span ng-if="$ctrl.address.length">{{ ::$ctrl.address }}<br /></span>
                <span ng-if="$ctrl.address.street">{{ ::($ctrl.getLangValue($ctrl.address.street)) }} {{ $ctrl.address.number }}<br /></span>
                <span ng-repeat="place in $ctrl.location">
                  {{ place.value }}<span ng-if="!$last"> · </span>
                </span>
                <span class="muted" ng-if="!$ctrl.location">No location provided</span>
              </span>
            </div>`
};

function controller($state, wikidata) {
  const vm = this;
  vm.go = go;
  vm.getLangValue = getLangValue;

  init();

  function init() {
    let prop;
    let id;
    const claims = vm.monument.claims;

    const simpleStreet = vm.monument.claims.P969
      ? vm.monument.claims.P969[0].mainsnak.datavalue.value
      : undefined;
    const objectStreet = vm.monument.claims.P669
      ? vm.monument.claims.P669[0].mainsnak.datavalue.value.id
      : undefined;
    let objectStreetNumber;
    if (objectStreet && vm.monument.claims.P669[0].qualifiers) {
      objectStreetNumber = vm.monument.claims.P669[0].qualifiers.P670
        ? vm.monument.claims.P669[0].qualifiers.P670[0].datavalue.value
        : undefined;
    }
    vm.address = simpleStreet || {
      street: vm.monument.valuesLabels[objectStreet],
      number: objectStreetNumber
    };

    if (claims.P276) {
      prop = "wdt:P276/wdt:P131";
      id = vm.monument.id;
    } else if (claims.P131) {
      prop = "wdt:P131";
      const preferred = claims.P131.filter(value => value.rank === "preferred");
      id = preferred.length
        ? preferred[0].mainsnak.datavalue.value.id
        : claims.P131[0].mainsnak.datavalue.value.id;
    } else {
      return;
    }

    wikidata.getLocation(id).then(response => {
      vm.location = response;
    });
  }

  function getLangValue(obj) {
    return obj[vm.lang.code] || obj.en || obj[Object.keys(obj)[0]];
  }

  function go(place) {
    const params = {};
    if (vm.params) {
      angular.extend(params, vm.params, {
        id: place.value_id.substring(1)
      });
    } else {
      angular.extend(params, {
        id: place.value_id.substring(1),
        heritage: 1
      });
    }
    $state.go("main.list", params);
  }
}

export default () => {
  angular.module("monumental").component("moLocation", LocationComponent);
};
