var firebaseRef  = require('../../../../firebase-ref');
module.exports = function($cookies){
  var cookieRootRef = $cookies && $cookies.rootRef?$cookies.rootRef:null;
  var rootRef = new Firebase(cookieRootRef || firebaseRef.dev);
  return {
    root: rootRef,
    users: rootRef.child('users')
  };
};