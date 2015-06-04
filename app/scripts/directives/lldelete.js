'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:llDelete
 * @description
 * # llDelete
 */
angular.module('laoshiListApp')
  .directive('llDelete', ['$modal', function ($modal) {

  	function link(scope) {

  		scope.deleteConfirm = function() {    	

		    var modalObj = {
		      templateUrl: 'views/templates/delete.html',
		      controller: 'DeleteCtrl',
		      size: 'sm',
		      resolve: {
		        toDelete: function() {
		          return scope.item;
		        },
		        collection: function() {
		          return scope.collection;
		        }
		      }
		    }

		    var modalInstance = $modal.open(modalObj);

		    modalInstance.result.then(function (deletedItem) {
		      console.log(deletedItem);
		    });
		  };

  	}

  	return {
  		template: '<button ng-click="deleteConfirm()">X</button>',
  		restrict: 'E',
  		scope: {
  			collection: '=',
  			item: '='
  		},
  		link:link
  	}



    
   
  }]);
