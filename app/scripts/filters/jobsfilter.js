'use strict';

/**
 * @ngdoc filter
 * @name laoshiListApp.filter:jobsFilter
 * @function
 * @description
 * # jobsFilter
 * Filter in the laoshiListApp.
 */
 angular.module('laoshiListApp')
 .filter('jobsFilter', function () {
 	return function (jobs, criteria) {

 		if(!criteria || criteria === {}) return jobs;

 		var keys = Object.keys(criteria);

 		//console.log(criteria);

    	// key should be common to filter object and to jobs object
    	function match(job, key) {

    		if (typeof job[key] === 'object')  {
				var valKeys = Object.keys(job[key]);
				var anyLength = valKeys.filter(function(val) {
					return criteria[key].indexOf(val) != -1;					
				});

				return anyLength.length > 0;

    		} else {

    			if (criteria[key].indexOf(job[key]) != -1) {
    				return true;
    			}
    		}

    		return false;


    	}

    	function globalMatch(job) {
    		var boolVal = true;
    		for (var i = 0; i < keys.length; i++) {
    			if(match(job, keys[i])) {
    				boolVal = true;	
    			} else {
    				boolVal = false;
    				break;
    			}
    		}
    		return boolVal;

    	}

    	var newJobs = jobs.filter(globalMatch);  

    	return newJobs;

    };
});
