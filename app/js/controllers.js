angular.module("matsi.controllers", ['firebase','ngCookies'])
.controller('HomeController',['$scope','$mdSidenav','$location','$state','StuffService',
	function($scope,$mdSidenav,$location,$state,StuffService){

		console.log('#YEEt');
		$scope.shittu = 'This is Shittu';
		$scope.kenny = 'This is kenny';
		$scope.stuff = {};
		$scope.stuffs = StuffService.read();
		$scope.createStuff = function()
		{
			console.log('clicked');
			StuffService.create($scope.stuff);
		}
}])
.controller('SettingsController',['$scope','$state',function($scope,$state){

}]);
  