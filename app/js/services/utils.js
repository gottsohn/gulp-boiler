angular.module('myapp.services')
.factory('Utils',['$rootScope', '$mdToast', function($rootScope, $mdToast) {

  return {
    toast: function(text, hideDelay, position) {
      text = text || 'Toast Text Goes Here';
      hideDelay = hideDelay || 1000;
      position = position || 'bottom left';

      return $mdToast.show({
        template: '<md-toast>'+text+'</md-toast>',
        hideDelay: hideDelay,
        position: position
      });
    }
  };

}]);