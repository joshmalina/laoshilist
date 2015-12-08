'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.Job
 * @description
 * # Job
 * Factory in the laoshiListApp.
 */
 angular.module('laoshiListApp')
 .factory('Job_', ['fbMethods', 'jobs__', function (fbMethods, jobs__) {

  	return function(jobID) {
 		return jobs__.getJob(jobID)
 	}
 }]);
