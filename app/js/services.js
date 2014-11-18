angular.module("matsi.services", ['firebase','ngCookies'])

.factory('StuffService',['$firebase','$cookies',function($firebase,$cookies){
	var rootRef = new Firebase($cookies.rootRef);
	console.log($cookies);
	return {

		create:function(stuff){
			rootRef.child('stuff').push(stuff);
		},
		read: function()
		{
			return $firebase(rootRef.child('stuff')).$asArray();
		}
	}
}]);
