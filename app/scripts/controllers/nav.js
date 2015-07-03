'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:NavctrlCtrl
 * @description
 * # NavctrlCtrl
 * Controller of the laoshiListApp
 */
angular.module('laoshiListApp')
  .controller('NavCtrl', ['$scope', 'Auth', '$location', function ($scope, Auth, $location) {
    
    $scope.auth = Auth;

    $scope.logout = function() {
        $scope.auth.$unauth();
        $location.path('/');
    };
    
    // any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
    	if(authData) {
    		$scope.authUser = authData.uid;
    	}
    });

    console.log($location.path());

    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

  }]);
