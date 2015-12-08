'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.jobs
 * @description
 * # jobs
 * Service in the laoshiListApp.
 */
angular.module('laoshiListApp')
  .factory('jobs__', ['$http', function ($http) {
  	var url = 'http://127.0.0.1:3000/api';
  	var jobs = $http.get(url + '/jobs');
    // AngularJS will instantiate a singleton by calling "new" on this function
    return function() {
    	return jobs;
    }
  }]);
