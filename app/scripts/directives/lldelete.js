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
		      animation: false,
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
		    });
		  };

  	}

  	return {
  		template: '<button class="btn btn-link" ng-click="deleteConfirm()">Delete</button>',
  		restrict: 'E',
  		scope: {
  			collection: '=',
  			item: '='
  		},
  		link:link
  	}



    
   
  }]);
