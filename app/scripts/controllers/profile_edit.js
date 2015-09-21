'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:ProfileEditCtrl
 * @description
 * # ProfileEditCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('ProfileEditCtrl', ['$http', 'currentAuth', 'User_', 'fbMethods', 'llConstants', '$firebaseArray', '$scope', '$location', '$routeParams', 'firebasePath', '$filter', 'laoshiListApi', 'Upload', function ($http, currentAuth, User_, fbMethods, llConstants, $firebaseArray, $scope, $location, $routeParams, firebasePath, $filter, laoshiListApi, Upload) {

 	User_(currentAuth.uid).$loaded().then(function(usr) {
 		$scope.isAdmin = usr.isAdmin();
 		$scope.isAdmin || currentAuth.uid == $routeParams.username ? '' : $location.path('/jobs');
 		$scope.cvref = usr.getPathToCV();
 	})

 	var ref = new Firebase (firebasePath + '/users/' + $routeParams.username);
		
 	$scope.user = User_($routeParams.username);
 	$scope.subjects = llConstants.subjects();
 	$scope.ages = llConstants.ages();
 	$scope.countries = llConstants.countries();
 	$scope.races = llConstants.ethnicities();	
 	$scope.degrees = llConstants.degrees();
 	$scope.colleges = llConstants.colleges();
 	$scope.majors = llConstants.majors();
 	$scope.languageLevel = llConstants.languageLevel();
 	$scope.cities = llConstants.cities();
 	$scope.roles = llConstants.roles();

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

	$scope.alerts = [];



	// upload resume
	$scope.uploadResume = function (files) {

        // prevent preemptive notices -- since this function is triggered
        // when the button is pressed -- it doesn't wait for a file
        if(files.length < 1) {
        	return;
        }

        $scope.alerts.push({type:'info', msg:'Attempting to upload your CV'});


        laoshiListApi.uploadCV(files, $scope.user.$id).then(function(path_to_cv) {
        	var url = path_to_cv;
        	$scope.alerts.push({type:'success', msg:'Your cv has been uploaded: <a target = "blank_" href="' + url + '">' + url + '</a>'});
        }, function(error) {
        	$scope.alerts.push({type:'danger', msg: 'There has been a problem uploading your CV. Please try again later.'});
        }, function(update) {
        	//
        })

        // var url = 'http://localhost:3000/api/resume';       

        // var options = {
        // 	url: url,
        //     fields: {'userid': $scope.user.$id, 'filekind' : 'resume'},
        //     file: files,
        //     method: 'POST'
        // }

        // $scope.alerts.push({type:'info', msg:'Attempting to upload your CV'});


        // Upload.upload(options).success(function (data, status, headers, config) {
        // 	console.log(data);
        // 	// we need to update the ref here, preferable with the extension of the file uploaded
        // 	$scope.user.cv = data;
        // 	$scope.user.$save();

        // 	url = url + '?userid=' + $scope.user.$id + '&extension=' + data;

        // 	//
        // 	$scope.alerts.push({type:'success', msg:'Your cv has been uploaded: <a target = "blank_" href="' + url + '">' + url + '</a>'});



        // }).error(function (data, status, headers, config) {
        //     console.log('error status: ' + status);
        //     console.log(data);
        // })

        
        // laoshiListApi.uploadCV(files, $scope.user.$id).then(function(url) {
        //     // store in firebase
        //     $scope.user.cv = url;
        //     $scope.user.$save();

        //     // success
        //     $scope.alerts.push({type:'success', msg:'Your cv has been uploaded: <a target = "blank_" href="' + url + '">' + url + '</a>'});

        // }, function(error) {
        //     // push an alert
        //     $scope.alerts.push({type:'danger', msg: error});
        //     //$scope.path_to_cv = null;
        // }, function(update) {
        //     // push an update
        //     $scope.alerts.push({type:'info', msg:update});
        // });

        
    };

	

}]);


