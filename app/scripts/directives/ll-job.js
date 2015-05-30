'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:llJob
 * @description
 * # llJob
 */
 angular.module('laoshiListApp')
 .directive('llJob', ['user', '$location', 'fbMethods', 'jobStatus', 'subjects', 'cities', 'ages', '$firebaseArray', 'firebasePath', '$firebaseObject', function (user, $location, fbMethods, jobStatus, subjects, cities, ages, $firebaseArray, firebasePath, $firebaseObject) {

   function link (scope) {

  		// get our job object from firebase
      var ref = new Firebase(firebasePath + '/jobs/' + scope.job.$id);

  		// make available to scope
  		scope.job_ = $firebaseObject(ref);

      // get all users
      var usersRef = new Firebase (firebasePath + '/users');
      scope.users = $firebaseArray(usersRef);

      var client = null;

      scope.updateClient = function() {
        client = new user(scope.job_.clientID);
        client.getInfo();
        scope.client = client; 
      };

      scope.job_.$loaded().then(function() {
        scope.updateClient();
        scope.visitClient = function() {
          client.visit();
        }

      });

      var notes = $firebaseArray(ref.child('notes'));

      scope.pushNote = function(newNote) {
        notes.$add({
          notevalue: newNote,
          userid: 'josh',
          date: fbMethods.getTime()
        })
        scope.newNote = null;
      };

      // generic save function, also updates datemodified value
      scope.save = function() {
        scope.job_.dateModified = fbMethods.getTime();
        scope.job_.$save().catch(function(error) {
         console.log('Couldn\'t update', error);
       });
      };

      scope.saveSubjects = function(model) {
        // update time
        ref.child('dateModified').set(fbMethods.getTime());
        ref.child('subjects').set(fbMethods.takeArrayReturnFbObject(model));        
      };



  		// make services available to view
  		scope.subjects = subjects;
  		scope.cities = cities;
  		scope.ages = ages;
  		scope.jobStatuses = jobStatus;

  		// config collapsable -- might refactor into a service
  		scope.isCollapsed = true;
  		scope.readMore = 'Expand';
  		scope.coll = function () {
  			scope.isCollapsed = !scope.isCollapsed;
  			scope.readMore = scope.isCollapsed ? 'Expand' : 'Collapse';
  		};

  		// remove a job

  	}


    return {
      templateUrl: 'views/templates/job.html',
      restrict: 'E',
      scope: {
      	job: '=',
      	key: '='
      },
      link: link  
    };
  }]);
