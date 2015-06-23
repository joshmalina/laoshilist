'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.llConstants
 * @description
 * # llConstants
 * Constant in the laoshiListApp.
 */
angular.module('laoshiListApp')
  .factory('llConstants', ['cities', 'ages', 'colleges', 'countries', 'degrees', 'ethnicities', 'jobStatus', 'majors', 'roles', 'subjects', 'languageLevel', function (cities, ages, colleges, countries, degrees, ethnicities, jobStatus, majors, roles, subjects, languageLevel) {

  	return {
  		cities: function() {
  			return cities;
  		},
  		ages: function() {
  			return ages;
  		},
  		colleges: function() {
  			return colleges;
  		},
  		countries: function() {
  			return countries;
  		},
  		degrees: function() {
  			return degrees;
  		},
  		ethnicities: function() {
  			return ethnicities;
  		},
  		jobstatus: function() {
  			return jobStatus;
  		},
  		majors: function() {
  			return majors;
  		},
  		roles: function() {
  			return roles;
  		},
  		subjects: function() {
  			return subjects;
  		},
  		languageLevel: function() {
  			return languageLevel;
  		}
  	};

  }]);
