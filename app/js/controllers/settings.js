angular.module("myapp.controllers")
.controller('Settings',['$rootScope','$scope','$state','Utils', 'Settings', function($rootScope, $scope, $state, Utils, Settings) {

  console.log('yeet');
  Utils.toast('Welcome ' + $rootScope.authUser.firstName);
  $scope.update = function(){

    Settings.update($rootScope.authUser,function(err){
      if(err && err.message) {
        Utils.toast(err.message);
      }
      else if(!err) {
        Utils.toast('Successfully updated user settings');
        $state.go('default');
      }
    });
 };

}]);
