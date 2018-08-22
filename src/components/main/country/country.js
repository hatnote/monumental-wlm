import './country.scss';
import template from './country.html';

import pack from '../../../../package.json';

const CountryComponent = { controller, template };

function controller($filter, $mdToast, $state, $stateParams, $window, WikiService, langService, mapService, wikidata) {
  const vm = this;
  const langs = langService.getUserLanguages();

  vm.stateParams = $stateParams;

  const ireland = [
    {
      name: 'Connacht',
      parts: [
        { name: 'Galway', coordinates: '53.3333:-9.0:11' },
        { name: 'Leitrim', coordinates: '54.1167:-8.0:11' },
        { name: 'Mayo', coordinates: '53.9:-9.25:11' },
        { name: 'Roscommon', coordinates: '53.75:-8.25:11' },
        { name: 'Sligo', coordinates: '54.25:-8.6667:11' }],
    },
    {
      name: 'Leinster',
      parts: [
        { name: 'Carlow', coordinates: '52.6667:-6.8333:11' },
        { name: 'Dublin', coordinates: '53.4167:-6.25:11' },
        { name: 'Kildare', coordinates: '53.1667:-6.75:11' },
        { name: 'Kilkenny', coordinates: '52.5833:-7.25:11' },
        { name: 'Laois', coordinates: '53.0:-7.4:11' },
        { name: 'Longford', coordinates: '53.6667:-7.75:11' },
        { name: 'Louth', coordinates: '53.8333:-6.5:11' },
        { name: 'Meath', coordinates: '53.6667:-6.6667:11' },
        { name: 'Offaly', coordinates: '53.25:-7.5:11' },
        { name: 'Westmeath', coordinates: '53.5:-7.5:11' },
        { name: 'Wexford', coordinates: '52.5:-6.6667:11' },
        { name: 'Wicklow', coordinates: '53.0:-6.4167:11' },
      ],
    },
    {
      name: 'Munster',
      parts: [
        { name: 'Clare', coordinates: '52.8333:-9.0:11' },
        { name: 'Cork', coordinates: '51.9667:-8.5833:11' },
        { name: 'Kerry', coordinates: '52.1667:-9.75:11' },
        { name: 'Limerick', coordinates: '52.5:-8.75:11' },
        { name: 'Tipperary', coordinates: '52.6667:-7.8333:11' },
        { name: 'Waterford', coordinates: '52.25:-7.5:11' },
      ],
    },
    {
      name: 'Ulster',
      parts: [
        { name: 'Cavan', coordinates: '53.9167:-7.25:11' },
        { name: 'Donegal', coordinates: '54.917:-8.0:11' },
        { name: 'Monaghan', coordinates: '54.244:-7.04:11' },
      ],
    },
  ];

  const uk = [
    {
      name: '',
      parts: [
        { name: 'England', coordinates: '52.6:-1.14:7' },
        { name: 'Scotland', coordinates: '56.4:-4.0:7' },
        { name: 'Wales', coordinates: '52.3:-3.6:7' },
        { name: 'Northern Ireland', coordinates: '54.6:-6.7:8' },
      ],
    },
  ];

  init();

  function init() {
    vm.config = {
      env: $window.__env,
      package: pack,
    };

    if ($stateParams.country === 'ireland') {
      vm.country = 'Ireland';
      vm.list = ireland;
    } else if ($stateParams.country === 'uk') {
      vm.country = 'United Kingdom';
      vm.list = uk;
    }
    $window.document.title = `${vm.country} – Wiki Loves Monuments Map`;
  }
}

export default () => {
  angular
    .module('monumental')
    .component('moCountry', CountryComponent);
};
