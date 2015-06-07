'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:explode
 * @description
 * # explode
 */
angular.module('laoshiListApp')
  .directive('explode', function () {

  	function link (scope) {

  		var keys = scope.array.isArray ? scope.array : Object.keys(scope.array);  	

  		if(scope.wrap) {
  			keys = keys.map(function(key) {
  				return scope.wrap[key];
  			});
  		}	

      if(scope.funcWrap) {
        keys = keys.map(function(key) {
          return scope.funcWrap(key);
        });
      }

  		scope.joined = keys.join(', ');
  	}

    return {
      template: '<span class="explode">{{joined}}</span>',
      restrict: 'E',
      scope: {
      	array: '=',
      	wrap: '=',
        funcWrap: '='
      },
      link: link
    };
  });
