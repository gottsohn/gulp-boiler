require("./js/config.js");

window.MyApp = angular.module("MyApp", [
  'myapp.controllers',
  'myapp.services',
  'myapp.directives',
  'ngAnimate', 
  'ngMaterial',
  'ui.router'
   ]);

MyApp.run(['$rootScope', function($rootScope) {
  // set globals we want available in ng expressions
  $rootScope._ = window._;
  $rootScope.moment = window.moment;
}]);

MyApp.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'pages/home.html',
      controller: 'Home',
      data: {
        access: 'public'
      }
    })
     .state('settings', {
      url: '/settings',
      templateUrl: 'pages/settings.html',
      controller: 'Settings',
      data: {
        access: 'private'
      }
    });
}]);


window.escapeEmailAddress = function(email) {
  if (!email) {
    return false;
  }
  // Replace '.' (not allowed in a Firebase key) with ',' (not allowed in an email address)
  email = email.toLowerCase();
  email = email.replace(/\./g, ',');
  return email;
};
