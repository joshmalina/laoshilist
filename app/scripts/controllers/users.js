'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('UsersCtrl', function ($scope) {

  	// create a service to generate unique userIDs
    
  	var users =	 {
  		bill1092:  	{
  			roles: {
  				teacher: true,
  				admin: true
  			},
  			fullName: 'bill',
  			contact: {
  				phone: '12321231421',
  				email: 'dfads@gsad.com',
  				wechat: 'weccaat',
  			},  		
  			dateJoined: '23124343',
  			lastLogin: '45252523',	  		
  			subjects: {
  				english: true,
  				TOEFL: true
  			},
  			// students if teacher, teachers if student
  			associatedWith: [],
  			lessons: [],
  			cv: null,	  		
  			schedule: {},
  			img: null,
  			vid: null,
  			voice: null,
  			country: null,
  			ethnicity: null,
  			city: {
  				beijing: true
  			},
  			education: [{
				uni: 'umontana',
				degree: 'BA',
				major: 'agriculture'
  			}, {
  				uni: 'ulondon',
  				degree: 'MA',
  				major: 'farmEcon'
  			}],
  			bank: {
  				bankName: null,
  				nameOnAcct: null,
  				num: null,
  				branch: null
  			},
  			linkenin: null,
  			// toggling this field should turn / on emails, contact to this person
  			active: true
  		},
	  		sally3235: {} 
  	};

  	$scope.users = users;

	  	var lessons = [
	  		{
	  			begin: 120329412,
	  			end: 1243124232,
	  			subjects: [],
	  			teacher: 'bill1092',
	  			status: 'complete' || 'incomplete',
	  			student: null,
	  			comment: null,
	  			rating: null,
	  			wage: null
	  		}
	  	];

	  	var transactions = [
	  		{
	  			when: 3234234234,
	  			debit: false,
	  			amount: 102.4,
	  			party: 'userID' || 'string'
	  		}
	  	];

	  });
