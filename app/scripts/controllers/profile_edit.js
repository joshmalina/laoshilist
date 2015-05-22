'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:ProfileEditCtrl
 * @description
 * # ProfileEditCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('ProfileEditCtrl', function ($scope, $log, $location, $routeParams, firebasePath, $firebaseObject, subjects, countries, ages, ethnicities) {

 	var ref = new Firebase (firebasePath + '/users/' + $routeParams['username']);
 	$scope.user = $firebaseObject(ref);
 	$scope.subjects = subjects;
 	$scope.ages = ages;
 	$scope.countries = countries;
 	$scope.races = ethnicities;	

 	$scope.go_to_profile = function() {
 		$location.path('/profile/' + $routeParams['username']);
 	}

	$scope.upload_image = function (image) {
		if (!image.valid) return;
		
		image.isUploading = true;
		var imageUpload = {
			isUploading: true,
			data: image.data,
		};

		ref.child('avatar').set(imageUpload, function (err) {
			if (!err) {
				ref.child('avatar').child('isUploading').remove();
				$scope.$apply(function () {
					$scope.status = 'Your image "' + image.filename + '" has been successfully uploaded!';
					if ($scope.uploaded_callback !== undefined) {
						$scope.uploaded_callback(angular.copy(imageUpload));
					}
					image.isUploading = false;
					image.data = undefined;
					image.filename = undefined;
				});
			}else{
				$scope.error = 'There was an error while uploading your image: ' + err;
			}
		});
	};
	


});


