import './toolbar.scss';
import template from './toolbar.html';

import langicon from './../../images/icon-language.png';

const ToolbarComponent = { bindings: { wide: '=' }, controller, template };

function controller($document, $filter, $mdSidenav, $mdToast, $state, $timeout, $window, WikiService, langService, loginService, wikidata) {
  const vm = this;
  const baseUrl = $window.__env.baseUrl;

  vm.isLoggedIn = loginService.getUser();
  vm.lang = {};
  vm.languagesList = langService.getLanguagesList();
  vm.languages = langService.getUserLanguages();
  vm.loading = true;
  vm.mobile = {};
  vm.saveUserLanguages = saveUserLanguages;
  vm.searchLang = text => $filter('filter')(vm.languagesList, text);
  vm.setLanguage = (lang) => { vm.languages.push(lang.code); };
  vm.search = { showSearch: false };

  // actions

  vm.goTo = goTo;
  vm.goToItem = goToItem;
  vm.login = login;
  vm.logout = logout;
  vm.mobile.closeSearch = closeSearch;
  vm.mobile.openSearch = openSearch;
  vm.toggleSidebar = () => $mdSidenav('left').toggle();
  vm.querySearch = text => wikidata.getSearch(text);

  init();

  // functions

  function closeSearch() {
    vm.mobile.showSearch = false;
  }

  function goTo(place) {
    vm.toggleSidebar();
    $timeout(() => $state.go(place), 150);
  }

  function goToItem(item) {
    if (!item) { return; }
    wikidata.getRecursive(item.id, 'wdt:P31/wdt:P279').then((response) => {
      const ids = response.map(prop => prop.value_id);
      if (ids.includes('Q56061') || ids.includes('Q5107')) {
        $state.go('main.list', { id: item.id.substring(1), heritage: 1, c: undefined });
      } else if (ids.includes('Q811979')) {
        $state.go('main.object', { id: item.id.substring(1) });
      } else {
        $state.go('main.object', { id: item.id.substring(1) });
        /*
        $mdToast.show($mdToast.simple()
          .position('top right')
          .textContent(`${item.label} is not an architectural structure or territorial entity`)
          .hideDelay(2000));
        */
      }
      closeSearch();
    });
  }

  function init() {
    $timeout(() => {
      loginService.isLoggedIn();
    }, 2000);
  }

  function login() {
    vm.loading = true;
    const current = $window.location.href;
    $window.location.href = `${baseUrl}/login?next=${encodeURIComponent(current)}`;
  }

  function logout() {
    $window.location.href = `${baseUrl}/logout`;
  }

  function openSearch() {
    vm.mobile.showSearch = true;
    $timeout(() => {
      const input = document.querySelector('#searchField');
      angular.element(input)[0].focus();
      return true;
    }, 100);
  }

  function saveUserLanguages() {
    langService.setUserLanguages(vm.languages)
      .then(() => {
        // $mdToast.show($mdToast.simple().textContent('Languages saved!').hideDelay(3000));
        $window.location.reload(false);
      });
  }
}

export default () => {
  angular
    .module('monumental')
    .component('moToolbar', ToolbarComponent)
    .directive('moToolbarScroll', ($window) => {
      let lastPosition = 0;
      return (scope) => {
        angular.element($window).bind('scroll', function () {
          if (this.pageYOffset > lastPosition) { scope.isHidden = true; }
          if (this.pageYOffset < lastPosition) { scope.isHidden = false; }
          lastPosition = this.pageYOffset;
          scope.$apply();
        });
      };
    });
};
