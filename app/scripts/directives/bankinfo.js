'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:bankInfo
 * @description
 * # bankInfo
 */
angular.module('laoshiListApp')
  .directive('bankInfo', ['$firebaseObject', 'firebasePath', function ($firebaseObject, firebasePath) {
    
  	function link (scope) {
  		var r = new Firebase (firebasePath + '/users/' + scope.user + '/payment/banks');
  		scope.bank = $firebaseObject(r.child(scope.ident));
  	}

    return {
      templateUrl: 'views/templates/bankInfo.html',
      restrict: 'E',
      scope: {
      	user: '@',
      	ident:'@'
      },
      link: link
    };
  }]);
