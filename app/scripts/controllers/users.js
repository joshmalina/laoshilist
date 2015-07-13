'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('UsersCtrl', ['users', 'roles', 'countries', 'llConstants', 'subjects', '$scope', 'firebasePath', '$firebaseArray', '$location', function (users, roles, countries, llConstants, subjects, $scope, firebasePath, $firebaseArray, $location) {

  var ref = new Firebase (firebasePath + '/users');
  var users_ = $firebaseArray(ref);
  $scope.users = users_;
  $scope.roles = roles;
  $scope.subjects = llConstants.subjects();
  $scope.countries = countries;

  $scope.viewProfile = function(userID) {
    $location.path('/profile/' + userID);
  };

  $scope.orderBy = '';  

  $scope.orderByFn = function(criterion) {
    $scope.orderBy = $scope.orderBy === criterion ? '-' + criterion : criterion;
  };

  $scope.addUser = function() {
    $scope.users.$add({      
      dateAdded: Firebase.ServerValue.TIMESTAMP
    }).then(function(ref) {
      $location.path('/profile_edit/' + ref.key());
    });
  };

  $scope.selectedUsers = [];

  // NEED TO AMMEND THIS FUNCTION TO ALSO DELETE THE RELEVANT S3 FOLDER
  $scope.deleteUsers = function() {
    $scope.selectedUsers.forEach(function(user, idx) {
      console.log(user);
      //remove user from db
      $scope.users.$remove(user).then(function(ref) {
        // remove user from selected list
        $scope.selectedUsers.splice(idx, 1);
      }).catch(function(error) {
      });
    });
  }

  $scope.toggleSelectedUser = function(user) {

    var idx = $scope.selectedUsers.indexOf(user);

    // if selected already, remove from array
    if(idx > -1) {
      $scope.selectedUsers.splice(idx, 1);
    } 

    // else add to array
    else {
      $scope.selectedUsers.push(user);
    }

  };

  $scope.skinny = true;

  ref.on('value', function(snapshot) {
      $scope.users_ = snapshot.val();    
  }, function (errorObject) {
    console.log('The read failed: ', errorObject);
  });


  
  
 


	// var users =	 {
	// 	bill1092:  	{
	// 		roles: {
	// 			teacher: true,
	// 			admin: true
	// 		},
	// 		fullName: 'bill',
 //      phone: '12321231421',
 //      email: 'dfads@gsad.com',
 //      wechat: 'weccaat',
 //      dateJoined: '23124343',
 //      lastLogin: '45252523',	  		
 //      subjects: {
 //        english: true,
 //        TOEFL: true
 //      },
	// 		// students if teacher, teachers if student
	// 		associatedWith: [],
	// 		lessons: [],
	// 		cv: null,	  		
	// 		schedule: {},
	// 		img: null,
	// 		vid: null,
	// 		voice: null,
	// 		country: null,
	// 		ethnicity: null,
	// 		city: {
	// 			beijing: true
	// 		},
	// 		education: [{
 //        uni: 'umontana',
 //        degree: 'BA',
 //        major: 'agriculture'
 //      }, {
 //        uni: 'ulondon',
 //        degree: 'MA',
 //        major: 'farmEcon'
 //      }],
 //      bank: {
 //        bankName: null,
 //        nameOnAcct: null,
 //        num: null,
 //        branch: null
 //      },
 //      linkenin: null,
	// 		// toggling this field should turn / on emails, contact to this person
	// 		active: true
	// 	},
 //   sally3235: {} 
 //  };

  // var lessons = [
  //  {
  //   begin: 120329412,
  //   end: 1243124232,
  //   subjects: [],
  //   teacher: 'bill1092',
  //   status: 'complete' || 'incomplete',
  //   student: null,
  //   comment: null,
  //   rating: null,
  //   wage: null
  // }
  // ];

  // var transactions = [
  // {
  //   when: 3234234234,
  //   debit: false,
  //   amount: 102.4,
  //   party: 'userID' || 'string',
  //   comment: 'string',
  //   dateOfPayment: 'timestamp'
  // }
  // ];

}]);
