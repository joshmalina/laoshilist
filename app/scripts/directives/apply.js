'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:apply
 * @description
 * # apply
 */
 angular.module('laoshiListApp')
 .directive('apply', ['firebasePath', 'Upload', function (firebasePath, Upload, Auth) {

 	function link(scope, element, attrs) { 	

 		var ref = new Firebase (firebasePath + '/users/' + scope.user);

 		scope.s3Upload = function(){
		  var status_elem = document.getElementById("status");
		  var url_elem = document.getElementById("image_url");
		  var preview_elem = document.getElementById("preview");
		  var s3upload = new S3Upload({
		      s3_object_name: showTitleUrl(),  // upload object with a custom name
		      file_dom_selector: 'image',
		      s3_sign_put_url: '/sign_s3',
		      onProgress: function(percent, message) {
		          status_elem.innerHTML = 'Upload progress: ' + percent + '% ' + message;
		      },
		      onFinishS3Put: function(public_url) {
		          status_elem.innerHTML = 'Upload completed. Uploaded to: '+ public_url;
		          url_elem.value = public_url;
		          preview_elem.innerHTML = '<img src="'+ public_url +'" style="width:300px;" />';
		      },
		      onError: function(status) {
		          status_elem.innerHTML = 'Upload error: ' + status;
		      }
		  });

		  function showTitleUrl() {
			  var title = scope.show.title.split(' ').join('_');
			  var dateId = Date.now().toString();
			  return dateId + title;
}
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


















// scope.uploadImage = function (image) {  




//  			if (!image.valid) {
//  				return;
//  			}

//  			image.isUploading = true;
//  			var imageUpload = {
//  				isUploading: true,
//  				data: image.data,
//  			};

//  			ref.child('resume').set(imageUpload, function (err) {
//  				if (!err) {
//  					ref.child('resume').child('isUploading').remove();
//  					scope.$apply(function () {
//  						scope.status = 'Your resume "' + image.filename + '" has been successfully uploaded!';
//  						if (scope.uploaded_callback !== undefined) {
//  							scope.uploaded_callback(angular.copy(imageUpload));
//  						}
//  						image.isUploading = false;
//  						image.data = undefined;
//  						image.filename = undefined;
//  					});
//  				}else{
//  					scope.error = 'There was an error while uploading your resume: ' + err;
//  				}
//  			});
//  		};