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

    	// key should be common to filter object and to jobs object
    	function match(job, key) {

            // for when we clear individual filters
            if(criteria[key] === undefined) {
                return true;
            }

            // a child of a job might be subjects
            // if this child is itself an object with children
            // the keys of those children will be the subject IDs
    		if (typeof job[key] === 'object')  {
                // get all the child keys, for example, the subj-id-math, etc...
				var valKeys = Object.keys(job[key]);
                // iterate through them all, building up an array of bools
				var anyLength = valKeys.filter(function(val) {
                    // and if our jobs subject if part of the array of chosen subjects, return a bool true,
                    // preserving that jobs id                                    

                    return criteria[key].indexOf(val) > -1;                    

				});

				return anyLength.length > 0;

    		} else {



    			if (criteria[key].indexOf(job[key]) > -1) {
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
