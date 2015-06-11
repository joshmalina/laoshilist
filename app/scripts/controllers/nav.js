'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:NavctrlCtrl
 * @description
 * # NavctrlCtrl
 * Controller of the laoshiListApp
 */
angular.module('laoshiListApp')
  .controller('NavCtrl', ['$scope', 'Auth', function ($scope, Auth) {
    
    $scope.auth = Auth;
    
    // any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
    	if(authData) {
    		$scope.authUser = authData.uid;
    		console.log(authData);
    	}
    });
  }]);
