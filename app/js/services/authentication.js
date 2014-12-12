angular.module('myapp.services')
.factory('Authentication',['$rootScope','$firebase', 'Refs', '$state', function($rootScope, $firebase, Refs, $state){
  
  return {
    login: function(){
       //analytics.track('Login');
          var options = { remember: true, scope: "email" };
          Refs.root.authWithOAuthPopup("google", function(err, authData) {
            if(err) {
              console.log('error logging in', err);
            } else {
              console.log('login successful');
            }
          }, options);
    },
    logout: function(){
      Refs.root.unauth();
      $rootScope.authUser = null;
      $state.go('default');
    },
    buildUserObjectFromGoogle: function(authData) {
      return {
        uid: authData.uid,
        name: authData.google.displayName,
        email: authData.google.email,
        accessToken: authData.google.accessToken,
        firstName: authData.google.cachedUserProfile.given_name,
        lastName: authData.google.cachedUserProfile.family_name,
        picture: authData.google.cachedUserProfile.picture
      };
    }
  };
}]);