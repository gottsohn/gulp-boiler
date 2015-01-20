angular.module('myapp.services')
.factory('Authorization',['$rootScope','Utils','$state', function($rootScope, Utils, $state){

    $rootScope.$on('$stateChangeStart',function(event,toState, toParams, fromState){
      var requiresAuth = /^user\//.test(toState.name);
      //console.log(fromState,':',toState);
      if(requiresAuth && !$rootScope.authUser){
        Utils.toast('You need to be logged in');
        $state.go('default');
        event.preventDefault();
      }
    });

    return {

    };
  }
]);