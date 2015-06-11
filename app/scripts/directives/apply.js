'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:apply
 * @description
 * # apply
 */
 angular.module('laoshiListApp')
 .directive('apply', ['firebasePath', function (firebasePath, Auth) {

 	function link(scope, element, attrs) { 	

 		var ref = new Firebase (firebasePath + '/users/' + scope.user);

 		scope.uploadImage = function (image) {  




 			if (!image.valid) {
 				return;
 			}

 			image.isUploading = true;
 			var imageUpload = {
 				isUploading: true,
 				data: image.data,
 			};

 			ref.child('resume').set(imageUpload, function (err) {
 				if (!err) {
 					ref.child('resume').child('isUploading').remove();
 					scope.$apply(function () {
 						scope.status = 'Your resume "' + image.filename + '" has been successfully uploaded!';
 						if (scope.uploaded_callback !== undefined) {
 							scope.uploaded_callback(angular.copy(imageUpload));
 						}
 						image.isUploading = false;
 						image.data = undefined;
 						image.filename = undefined;
 					});
 				}else{
 					scope.error = 'There was an error while uploading your resume: ' + err;
 				}
 			});
 		};

 	}


 	return {
 		templateUrl: 'views/templates/apply.html',
 		restrict: 'E',
 		scope: {
 			user: '=',
 			resume: '='
 		},
 		link: link
 	}



 }]);
