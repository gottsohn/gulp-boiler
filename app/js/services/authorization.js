angular.module('myapp.services')
.factory('Authorization',['$rootScope','Utils', function($rootScope, Utils){

    $rootScope.$on('$stateChangeStart',function(event,toState, toParams, fromState){
      var requiresAuth = /^user\//.test(toState.name);
      //console.log(fromState,':',toState);
      if(requiresAuth && !$rootScope.authUser){
        Utils.toast('You need to be logged in');
        event.preventDefault();
      }
    });

    return {

    };
  }
]);