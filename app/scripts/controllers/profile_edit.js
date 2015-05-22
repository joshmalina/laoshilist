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

	/*
	 * this function takes firebase data, aka an object with a bunch
	 * of meaningful keys, like {chinese: true, english: true}, and
	 * a bunch of non-sense values, as in 'true', 'true', etc...
	 *
	 * it returns nothing, but it's side effect is to set the value
	 * of a scope-bound array -- would be nice if it did
	 */
	 var fbObj_to_array = function(start_object, scope_array) {			
		// iterate through object
		for(var k in start_object) {
			// build array
			scope_array.push(k);
		};
	};

	// would be great if this returned something, for the sake of unit testing
	var save_array_to_fb_object = function(model, refChild) {
		var o = {};
		var l = model.length;
		for (var i = 0; i < l; i++) {
			o[model[i]] = true;
		}
		ref.child(refChild).set(o);
	};

	$scope.user.$loaded().then(function() {
		fbObj_to_array($scope.user.subjects, $scope.user_subjects=[]);
		fbObj_to_array($scope.user.ages, $scope.user_ages=[]);
	});	

	// should be a way to define this function partially
	$scope.save_subjects = function(model) {
		save_array_to_fb_object(model, 'subjects');
	}

	$scope.save_ages = function(model) {
		save_array_to_fb_object(model, 'ages');
	}



});


