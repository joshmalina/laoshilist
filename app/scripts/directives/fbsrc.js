'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:fbSrc
 * @description
 * # fbSrc
 */
angular.module('laoshiListApp')
  .directive('fbSrc', ['$log', function ($log) {
	// Used to embed images stored in Firebase
	
	/*
	Required attributes:
		fp-src (The name of an image stored in Firebase)
	*/
	return {
		link: function (scope, elem, attrs) {
			var safename = attrs.fpSrc.replace(/\.|\#|\$|\[|\]|-|\//g, "");
			var dataRef = new Firebase( scope.firebaseUrl );
			elem.attr('alt', attrs.fpSrc);
			dataRef.once('value', function (snapshot) {
				var image = snapshot.val();
				if (!image) {
					$log.log('It appears the image ' + attrs.fpSrc + ' does not exist.');
				}else{
					elem.attr('src', image.data);
				}
			});
		},
		restrict: 'A'
	};
}]);