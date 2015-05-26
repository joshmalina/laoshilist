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
		
 	$scope.user = $firebaseObject(ref)
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

	/*
	 * this function takes firebase data, aka an object with a bunch
	 * of meaningful keys, like {chinese: true, english: true}, and
	 * a bunch of non-sense values, as in 'true', 'true', etc...
	 *
	 * it returns nothing, but it's side effect is to set the value
	 * of a scope-bound array -- would be nice if it did
	 */
	 var fbObjToArray = function(startObject, scopeArray) {			
		// iterate through object
		for(var k in startObject) {
			// build array
			scopeArray.push(k);
		}
	};

	// would be great if this returned something, for the sake of unit testing
	var saveArrayToFbObject = function(model, refChild) {
		var o = {};
		var l = model.length;
		for (var i = 0; i < l; i++) {
			o[model[i]] = true;
		}
		ref.child(refChild).set(o);
	};

	$scope.user.$loaded().then(function() {
		fbObjToArray($scope.user.subjects, $scope.userSubjects=[]);
		fbObjToArray($scope.user.ages, $scope.userAges=[]);
		var date = new Date($scope.user.birthday);
		$scope.userBirthday = $filter('date')(date, 'yyyy-MM-dd');
		fbObjToArray($scope.user.roles, $scope.userRoles=[]);
	});	

	// should be a way to define this function partially
	$scope.saveSubjects = function(model) {
		saveArrayToFbObject(model, 'subjects');
	};

	$scope.saveAges = function(model) {
		saveArrayToFbObject(model, 'ages');
	};

	$scope.saveRoles = function(model) {
		saveArrayToFbObject(model, 'roles');
	}

	$scope.saveDate = function(date) {
		var tms = Date.parse(date);
		ref.child('birthday').set(tms);
	};

	$scope.mapOptions = {
      enableMapClick: false,
      // ui map config
      // 是否使用缓存来缓存此map dom，而不是每次链接跳转来都重新创建
      uiMapCache: true
    };

}]);


