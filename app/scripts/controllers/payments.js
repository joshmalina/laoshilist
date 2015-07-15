'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:BooksCtrl
 * @description
 * # BooksCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('PaymentsCtrl', ['$location', 'Job_', '$scope', '$firebaseArray', 'firebasePath', 'user', 'fbMethods', function ($location, Job_, $scope, $firebaseArray, firebasePath, user, fbMethods) {

  var ref = new Firebase (firebasePath + '/payments');

  $scope.items = $firebaseArray(ref.orderByChild('whenPaid'));

  // want to remap this array of payments so that there is a job title associated with the id

  $scope.items.$loaded().then(function(items) {
    var newmapping = 
      items.map(function(eachItem) {
        if(eachItem.job) {
          var newJob = Job_(eachItem.job);
          newJob.$loaded().then(function(job) {
            eachItem.jobtitle = job.title;
          })
        }
        return eachItem
      });
  });


  var jobsRef = new Firebase (firebasePath + '/jobs');

  $scope.getJobTitle = function(id) {
    var job = new Job_(id);
    job.$loaded().then(function(j) {
      return j.title;
    })
  }; 

  $scope.selectedItems = [];
   $scope.focusinControl = {
    selectedItems: [],
    collection: $scope.items
  }; 

  $scope.addItem = function() {
   $scope.items.$add({
    whenAdded: fbMethods.getTime(),
    whenModified: fbMethods.getTime()
  }).then(function(ref) {
    $location.path('/paymentsEdit/' + ref.key());
  });
 };

}]);
