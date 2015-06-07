'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.user
 * @description
 * # user
 * Service in the laoshiListApp.
 */
 angular.module('laoshiListApp')
 .factory('user', ['$location', '$firebaseObject', 'firebasePath', '$firebaseArray', function ($location, $firebaseObject, firebasePath, $firebaseArray) {
  
  function User(userID) {

    this.userID = userID;

    var ref = new Firebase (firebasePath + '/users/' + userID);

    var userObj = $firebaseObject(ref);

    var self = this;

    userObj.$loaded().then(function(userReturned) {
      self.firstName = userReturned.firstName;
      // self.jobs = userReturned.jobs;     
    });

  }

  User.prototype.getFirstName = function() {
    return this.firstName;
  };

  User.prototype.assignJob = function(jobID) {

    var self = this;

    var ref = new Firebase (firebasePath + '/users/' + self.userID);

    var jobs = $firebaseObject(ref.child('jobs'));

    var obj = {};

    obj[jobID] = true;

    //jobs[jobID] = true;   

    // ref.child('jobs').set(null); 

  };


  return User;




 

 }]);
