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
  	
  	function getJobs() {
  		return $http.get(url + '/jobs');
  	}

  	function getJob (id) {
  		var options = {
  			url: url + '/jobs',
  			params: {id:id},
  			method: 'GET'
  		}
  		return $http(options);
  	}

  	function addJob (data) {
  		var options = {
  			url: url + '/jobs',
  			data: data,
  			method: 'POST'
  		}
  		return $http(options);
  	}

  	function updateJob (data) {
  		return $http.post(url + '/updateJob', data);
  	}


    // AngularJS will instantiate a singleton by calling "new" on this function
    return {    	
		getJobs: function() {
			return getJobs()
		},
		getJob: function(id) {
			return getJob(id)
		},
		addJob: function(data) {
			return addJob(data);
		},
		updateJob: function(data) {
			return updateJob(data);
		}
    }
  }]);