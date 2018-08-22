const LoginService = ($window, WikiService) => {
  const baseUrl = $window.__env.baseUrl;
  const service = {
    getUser: () => user,
    isLoggedIn,
    login,
    logout,
  };

  let user = {
    isLoading: true,
  };

  return service;

  function isLoggedIn() {
    return WikiService.getUserInfo().then((response) => {
      angular.extend(user, { isLoading: false }, response);
      return user;
    });
  }

  function login() {
    const current = $window.location.href;
    $window.location.href = `${baseUrl}/login?next=${encodeURIComponent(current)}`;
  }

  function logout() {
    $window.location.href = `${baseUrl}/logout`;
  }
};

export default () => {
  angular
    .module('monumental')
    .factory('loginService', LoginService);
};
