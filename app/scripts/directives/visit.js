'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:visit
 * @description
 * # visit
 */
angular.module('laoshiListApp')
  .directive('visit', ['user', function (user) {

  	function link(scope) {
  		scope.user = new user(scope.who);
  	}  	

    return {
      template: '<a ng-href="#/profile/{{who}}">{{user.firstName}} {{user.lastName | limitTo: 1}}</a>',
      restrict: 'E',
      scope: {
      	who: '='
      },
      link: link
    };
  }]);
