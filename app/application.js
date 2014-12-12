require("./js/config.js");

window.MyApp = angular.module("MyApp", [
  'myapp.controllers',
  'myapp.services',
  'myapp.directives',
  'ngAnimate', 
  'ngMaterial',
  'ui.router'
   ]);

MyApp.run(['$rootScope','Refs','$timeout','Authentication', 'Authorization', function($rootScope, Refs, $timeout, Authentication, Authorization) {
  // set globals we want available in ng expressions
  $rootScope._ = window._;
  $rootScope.moment = window.moment;
  Refs.root.onAuth(function(authData) {
    if(authData) {
      console.log("auth: user is logged in");
      var user = Authentication.buildUserObjectFromGoogle(authData);
      var userRef = Refs.users.child(user.uid);
      userRef.on('value', function(snap) {
        if(!snap.val()) {
          user.created = Firebase.ServerValue.TIMESTAMP;
          userRef.set(user);
          //analytics.track('Signup');
        }
        else{
          user = snap.val();
        }
        console.log(user);
        $timeout(function(){
          $rootScope.authUser = user;
        });
      });

      // indicate to the rest of the app that we're logged in
      $rootScope.authUser = user;

      // analytics.identify(user.uid, {
      //   name: user.name,
      //   firstName: user.firstName,
      //   lastName: user.lastName,
      //   email: user.email
      // });
    }
    else {
      // user is logged out
      console.log("auth: user is logged out");
      $rootScope.authUser = null;
    }
  });

}]);

MyApp.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);
  $stateProvider
    .state('default', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'Home',
      data: {
        access: 'public'
      }
    })
    .state('user/settings', {
      url: '/user/settings',
      templateUrl: 'views/settings.html',
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
