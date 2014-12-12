angular.module('myapp.services')
.factory('Settings',['$rootScope','Utils', 'Refs', function($rootScope, Utils, Refs){
    
    return {
      update: function(user,cb){
          if($rootScope.authUser.isAdmin || $rootScope.authUser.uid === user.uid)
            Refs.users.child(user.uid).set(user,cb);
          else
              cb({message:'Invalid Authorization'});
      } 
    };
}]);