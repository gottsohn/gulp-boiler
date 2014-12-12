angular.module("myapp.controllers")
.controller('Settings',['$rootScope','$scope','$state','Utils', 'Settings', function($rootScope, $scope, $state, Utils, Settings){
  
  console.log('yeet');
  Utils.toast('Welcome ' + $rootScope.authUser.lastName);
  $scope.login = function(){
    Settings.update($rootScope.authUser,function(err){
      if(!err)
        Utils.taost('Settings updated');
    });
  };

}]);
  