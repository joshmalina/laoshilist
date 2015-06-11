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


      var keys = null;

      if(scope.array) {
        keys = Array.isArray(scope.array) ? scope.array : Object.keys(scope.array);   
      } else if (scope.obj) {
        keys = Object.keys(scope.obj);
      }
      


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
        obj: '='
      },
      link: link
    };
  });
