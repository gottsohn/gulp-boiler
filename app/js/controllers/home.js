angular.module("myapp.controllers")
.controller('Home',['$scope','$mdSidenav','$location','$state',
  function($scope,$mdSidenav,$location,$state){

    console.log('#YEEt');
    $scope.shittu = 'This is Shittu';
    $scope.kenny = 'This is kenny';
    $scope.stuff = {};
    $scope.stuffs = StuffService.read();
    $scope.createStuff = function() {
      console.log('clicked');
    }
}]);