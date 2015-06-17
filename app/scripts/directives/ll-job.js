'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:llJob
 * @description
 * # llJob
 */
 angular.module('laoshiListApp')
 .directive('llJob', ['users', 'Auth', 'user', '$location', 'fbMethods', 'jobStatus', 'subjects', 'cities', 'ages', '$firebaseArray', 'firebasePath', '$firebaseObject', function (users, Auth, user, $location, fbMethods, jobStatus, subjects, cities, ages, $firebaseArray, firebasePath, $firebaseObject) {

   function link (scope) {

      var authObj = Auth.$getAuth();

  		// get our job object from firebase
      var ref = new Firebase(firebasePath + '/jobs/' + scope.job.$id);
  		// make available to scope
  		scope.job_ = $firebaseObject(ref); 

      scope.teachers = users.getTeachers();
      scope.clients = users.getClients();

      var client = null;

      scope.updateClient = function() {        
        scope.client = new user(scope.job_.clientID);
      };

      scope.job_.$loaded().then(function() {
        scope.updateClient();
      });

      scope.notes = $firebaseArray(ref.child('notes'));      
      
      // when anything about the job changes, including adding notes,
      // the dateModified field gets updated
      ref.on('child_changed', function() {
        ref.child('dateModified').set(fbMethods.getTime());
      })

      // generic save function, now unnecessary b/c time gets updated automatically
      scope.save = function() {
        scope.job_.$save().catch(function(error) {
         console.log('Couldn\'t update', error);
       });
      };

      scope.saveSubjects = function(model) {
        ref.child('subjects').set(fbMethods.takeArrayReturnFbObject(model));
      };



  		// make services available to view
  		scope.subjects = subjects;
  		scope.cities = cities;
  		scope.ages = ages;
  		scope.jobStatuses = jobStatus;

  		// config collapsable -- might refactor into a service - might turn into a modal or even a seperate page
  		scope.isCollapsed = true;
  		scope.readMore = 'Expand';
  		scope.coll = function () {
  			scope.isCollapsed = !scope.isCollapsed;
  			scope.readMore = scope.isCollapsed ? 'Expand' : 'Collapse';
  		};

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
