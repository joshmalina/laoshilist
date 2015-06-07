'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:llJob
 * @description
 * # llJob
 */
 angular.module('laoshiListApp')
 .directive('llJob', ['Auth', 'user', '$location', 'fbMethods', 'jobStatus', 'subjects', 'cities', 'ages', '$firebaseArray', 'firebasePath', '$firebaseObject', function (Auth, user, $location, fbMethods, jobStatus, subjects, cities, ages, $firebaseArray, firebasePath, $firebaseObject) {

   function link (scope) {

    var authObj = Auth.$getAuth();

  		// get our job object from firebase
      var ref = new Firebase(firebasePath + '/jobs/' + scope.job.$id);
      var usersRef = new Firebase(firebasePath + '/users');

  		// make available to scope
  		scope.job_ = $firebaseObject(ref); 

      scope.teachers = [];
      scope.clients = [];

      var client = null;

      scope.updateClient = function() {        
        scope.client = new user(scope.job_.clientID);
        //scope.client.assignJob(scope.job_.$id);
      };

      scope.job_.$loaded().then(function() {
        scope.updateClient();
      });

      usersRef.on('value', function(querySnapshot) {
        querySnapshot.forEach(function(userSnap) {
          var user = userSnap.val();
          // two seperate conditionals because at some point our students / teachers could overlap
          if(user.roles[0]) {
            scope.teachers.push({firstName: user.firstName, id: userSnap.key()});
          }
          if(user.roles[1]) {
            scope.clients.push({firstName: user.firstName, id: userSnap.key()});
          }
        });
      });

      scope.notes = $firebaseArray(ref.child('notes'));      

      scope.pushNote = function(newNote) {
        scope.notes.$add({
          notevalue: newNote,
          userid: authObj.password.email,
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
        ref.child('subjects').set(fbMethods.takeArrayReturnFbObject(model));
        ref.child('dateModified').set(fbMethods.getTime()); 
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
