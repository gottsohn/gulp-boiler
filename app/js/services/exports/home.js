module.exports = function(rootRef, $rootScope, $firebase){
  return {
    create:function(stuff){
      rootRef.child('stuff').push(stuff);
    },
    read: function()
    {
      return $firebase(rootRef.child('stuff')).$asArray(); 
    }
  }
};