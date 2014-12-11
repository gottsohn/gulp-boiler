angular.module("myapp.services")
.factory('Home',['Refs','$rootScope','$firebase',function(Refs, $rootScope,$firebase) {
	return require('./exports/home')(Refs.root, $rootScope, $firebase);
}]);
