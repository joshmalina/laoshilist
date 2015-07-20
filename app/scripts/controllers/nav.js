'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:NavctrlCtrl
 * @description
 * # NavctrlCtrl
 * Controller of the laoshiListApp
 */
angular.module('laoshiListApp')
  .controller('NavCtrl', ['$scope', 'Auth', '$location', 'User_', function ($scope, Auth, $location, User_) {

    $scope.auth = Auth;


    // any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
        if(authData) {
            $scope.authUser = authData.uid;
            User_(authData.uid).$loaded().then(function(usr) {
                $scope.isAdmin = usr.isAdmin();
            })
        }
    });
    

    

    $scope.logout = function() {
        $scope.auth.$unauth();
        $location.path('/login');
    };
    
    

    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

  }]);
