angular.module("matsi.directives", ['firebase','ngCookies'])
  .directive('header', function() {
    return {
      restrict: 'E',
      controller: ['$rootScope', '$scope', '$firebase', '$cookies',
       function($rootScope, $scope, $firebase, $cookies) {
        var rootRef = new Firebase($cookies.rootRef);
        var usersRef = rootRef.child('users');
        var welcomeRef = rootRef.child('welcome');

        // Start with no user logged in
        $rootScope.currentUser = null;

        // Upon successful login, set the user object
        // happens automatically when rememberMe is enabled
        rootRef.onAuth(function(authData) {
          if(authData) {
            console.log("auth: user is logged in");
            var user = buildUserObjectFromGoogle(authData);

            var userRef = usersRef.child(user.uid);
            userRef.on('value', function(snap) {
              if(!snap.val()) {
                user.created = Firebase.ServerValue.TIMESTAMP;
                userRef.set(user);
                welcomeRef.child(user.uid).set(user);
                analytics.track('Signup');
              }
            });

            // indicate to the rest of the app that we're logged in
            $rootScope.currentUser = user;

            analytics.identify(user.uid, {
              name: user.name,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email
            });
          }
          else {
            // user is logged out
            console.log("auth: user is logged out");
            $rootScope.currentUser = null;
          }
        });

        $scope.login = function() {
          analytics.track('Login');
          options = { remember: true, scope: "email" };
          rootRef.authWithOAuthRedirect("google", function(err, authData) {
            if(err) {
              console.log('error logging in', err);
            } else {
              console.log('login successful');
            }
          }, options);
        }

        $scope.logout = function() {
          rootRef.unauth();
          window.location.pathname = "/";
        };
      }]
    }
  });

function buildUserObjectFromGoogle(authData) {
  return {
    uid: authData.uid,
    name: authData.google.displayName,
    email: authData.google.email,
    accessToken: authData.google.accessToken,
    firstName: authData.google.cachedUserProfile.given_name,
    lastName: authData.google.cachedUserProfile.family_name,
    picture: authData.google.cachedUserProfile.picture
  }
}
