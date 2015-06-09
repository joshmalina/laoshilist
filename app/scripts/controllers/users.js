'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('UsersCtrl', ['$modal', 'roles', '$scope', 'firebasePath', '$firebaseArray', '$location', function ($modal, roles, $scope, firebasePath, $firebaseArray, $location) {

  var ref = new Firebase (firebasePath + '/users');
  var users = $firebaseArray(ref);
  $scope.users = users;
  $scope.roles = roles;

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

  $scope.skinny = true;

  ref.on('value', function(snapshot) {
      $scope.users_ = snapshot.val();    
  }, function (errorObject) {
    console.log('The read failed: ', errorObject);
  });


  ref.on('value', function(querySnapshot) {
    var teachers = [];
    querySnapshot.forEach(function(userSnap) {
      var user = userSnap.val();
      if(user.roles[0]) {
          teachers.push({firstName: user.firstName, id: userSnap.key()});
      }
    });
  });

  // $scope.deleteConfirm = function(toDelete) {

  //   console.log(toDelete);

  //   var modalObj = {
  //     templateUrl: 'views/templates/delete.html',
  //     controller: 'DeleteCtrl',
  //     animation: false,
  //     size: 'sm',
  //     resolve: {
  //       toDelete: function() {
  //         return toDelete;
  //       },
  //       collection: function() {
  //         return $scope.users;
  //       }
  //     }
  //   }

  //   var modalInstance = $modal.open(modalObj);

  //   modalInstance.result.then(function (deletedItem) {
  //     console.log(deletedItem);
  //   });
  // };

 


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
