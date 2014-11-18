require("./js/controllers.js");
require("./js/directives.js");
require("./js/services.js");

window.Matsi = angular.module("Matsi", [
  'matsi.controllers',
  'matsi.services',
  'matsi.directives',
  'ngAnimate', 
  'ngMaterial',
  'ui.router'
   ]);

Matsi.run(['$rootScope', function($rootScope) {
  // set globals we want available in ng expressions
  $rootScope._ = window._;
  $rootScope.moment = window.moment;
}]);

Matsi.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'pages/home.html',
      controller: 'HomeController',
      data: {
        access: 'public'
      }
    })
     .state('settings', {
      url: '/settings',
      templateUrl: 'pages/settings.html',
      controller: 'SettingsController',
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
