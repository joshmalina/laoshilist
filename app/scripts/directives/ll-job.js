'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:llJob
 * @description
 * # llJob
 */
 angular.module('laoshiListApp')
 .directive('llJob', ['llConstants', 'Job_', 'User_', 'users', 'Auth', 'user', '$location', 'fbMethods', 'firebasePath', function (llConstants, Job_, User_, users, Auth, user, $location, fbMethods, firebasePath) {

   function link (scope) {

    var authObj = Auth.$getAuth();

  		// get our job object from firebase
      var ref = new Firebase(firebasePath + '/jobs/' + scope.job.$id);

  		// make available to scope
  		scope.job_ = Job_(scope.job.$id); 

      scope.teachers = users.getTeachers();
      scope.clients = users.getClients();

      var client = null;

      scope.updateClient = function() {        
        scope.client = new user(scope.job_.clientID);
      };

      scope.job_.$loaded().then(function(o) {
        scope.updateClient();
        if(o.$value === null) {
          $location.path('/');
        }
      });   

      scope.notes = scope.job_.getNotes();   

    
      
      // when anything about the job changes, including adding notes,
      // the dateModified field gets updated
      ref.on('child_changed', function() {
        ref.child('dateModified').set(fbMethods.getTime());
      })

      scope.save = function() {
        scope.job_.$save().catch(function(error) {
         console.log('Couldn\'t update', error);
       });
      };

      scope.saveSubjects = function(model) {
        ref.child('subjects').set(fbMethods.takeArrayReturnFbObject(model));
      };



  		// make services available to view
  		scope.subjects = llConstants.subjects();
  		scope.cities = llConstants.cities();
  		scope.ages = llConstants.ages();
  		scope.jobStatuses = llConstants.jobstatus();
      scope.countries = llConstants.countries();


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
