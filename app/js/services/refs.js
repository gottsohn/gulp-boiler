angular.module("myapp.services")
.factory('Refs',['$cookies',function($cookies){
  return require('./exports/refs')($cookies);
}]);
