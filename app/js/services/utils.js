angular.module('myapp.services')
.factory('Utils',['$rootScope', '$mdToast', function($rootScope, $mdToast){
  
  return {
    toast: function(text, hideDelay, position){
      var text = text || 'Toast Text Goes Here';
      var hideDelay = hideDelay || 1000;
      var position = position || 'bottom left';

      return $mdToast.show({
        template: '<md-toast>'+text+'</md-toast>',
        hideDelay: hideDelay,
        position: position
      });
    }
  };
  
}]);