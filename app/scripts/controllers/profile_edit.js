'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:ProfileEditCtrl
 * @description
 * # ProfileEditCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('ProfileEditCtrl', ['fbMethods', 'roles', '$firebaseArray', '$scope', '$log', '$location', '$routeParams', 'firebasePath', '$firebaseObject', 'subjects', 'countries', 'ages', 'ethnicities', 'degrees', 'colleges', 'majors', '$filter', 'languageLevel', 'cities', function (fbMethods, roles, $firebaseArray, $scope, $log, $location, $routeParams, firebasePath, $firebaseObject, subjects, countries, ages, ethnicities, degrees, colleges, majors, $filter, languageLevel, cities) {

 	var ref = new Firebase (firebasePath + '/users/' + $routeParams.username);
		
 	$scope.user = $firebaseObject(ref);
 	$scope.subjects = subjects;
 	$scope.ages = ages;
 	$scope.countries = countries;
 	$scope.races = ethnicities;	
 	$scope.degrees = degrees;
 	$scope.colleges = colleges;
 	$scope.majors = majors;
 	$scope.languageLevel = languageLevel;
 	$scope.cities = cities;
 	$scope.roles = roles;

 	$scope.goToProfile = function() {
 		$location.path('/profile/' + $routeParams.username);
 	};

 	$scope.notes = $firebaseArray(ref.child('notes'));

 	$scope.contacts = $firebaseArray(ref.child('contact'));
 	var bankRef = new Firebase (firebasePath + '/users/' + $routeParams.username + '/payment/banks');
 	$scope.banks = $firebaseArray(bankRef);

	$scope.addContact = function() {
		fbMethods.addEmpty($scope.contacts);
	};

 	$scope.addBank = function() {
 		fbMethods.addEmpty($scope.banks);
	};

 	$scope.uploadImage = function (image) {
 		if (!image.valid) {
 			return;
 		}

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

 	// for img shower
 	$scope.firebaseUrl = ref+ '/avatar';

	$scope.user.$loaded().then(function() {

		fbMethods.fbObjToArray($scope.user.subjects, $scope.userSubjects=[]);
		fbMethods.fbObjToArray($scope.user.ages, $scope.userAges=[]);
		fbMethods.fbObjToArray($scope.user.roles, $scope.userRoles=[]);

		var date = new Date($scope.user.birthday);
		$scope.userBirthday = $filter('date')(date, 'yyyy-MM-dd');
	});	

	$scope.saveSubjects = function(model) {
		fbMethods.saveArrayToFbObject(model, ref.child('subjects'));
	};

	$scope.saveAges = function(model) {
		fbMethods.saveArrayToFbObject(model, ref.child('ages'));
	};

	$scope.saveRoles = function(model) {
		fbMethods.saveArrayToFbObject(model, ref.child('roles'));
	};

	$scope.saveDate = function(date) {
		var tms = Date.parse(date);
		ref.child('birthday').set(tms);
	};

	

}]);


