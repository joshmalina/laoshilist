'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:batchDelete
 * @description
 * # batchDelete
 */
 angular.module('laoshiListApp')
 .directive('batchDelete', function () {

 	function link (scope) {

 		scope.internalControl = scope.control || {};

 		scope.toggleSelectedItem = function(item) {

 			var idx = scope.internalControl.selectedItems.indexOf(item);

		    // if selected already, remove from array
		    if(idx > -1) {
		    	scope.internalControl.selectedItems.splice(idx, 1);
		    } 

		    // else add to array
		    else {
		    	scope.internalControl.selectedItems.push(item);
		    }

		    console.log(scope.internalControl.selectedItems);

		};


		scope.internalControl.deleteItems = function() {
			console.log('clicked');
			scope.internalControl.selectedItems.forEach(function(item, idx) {
				console.log(item);
		      	//remove item from db
		      	scope.internalControl.collection.$remove(item).then(function(ref) {
		        	// remove item from selected list
		        	scope.internalControl.selectedItems.splice(idx, 1);
		        }).catch(function(error) {
		        	console.log(error);
		        });
		    });

		};


	}

	return {
		template: '<input type="checkbox" ng-checked="selectedItems.indexOf(item) > -1" ng-click="toggleSelectedItem(item)">{{a}}',
		restrict: 'E',
		scope: {
			item: "=",
			control: "="
		},
		link: link
	};
});
