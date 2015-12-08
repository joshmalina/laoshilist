'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:llJob
 * @description
 * # llJob
 */
 angular.module('laoshiListApp')
 .directive('llJob', ['jobs__', 'llConstants', 'Job_', 'User_', 'users', 'Auth', 'user', 'cities', '$location', 'fbMethods', 'firebasePath', 'ages', function (jobs__, llConstants, Job_, User_, users, Auth, user, cities, $location, fbMethods, firebasePath, ages) {

   function link (scope) {

    var authObj = Auth.$getAuth();  		

  		// make available to scope
  		var job_ = Job_(scope.job._id);
      job_.then(function(j) {
        if (j == null) $location.path('/');
        scope.job_ = j.data[0];
        console.log(scope.job_);
      }) 

      scope.teachers = users.getTeachers();
      scope.clients = users.getClients();

      var client = null;

      scope.updateClient = function() {        
        if(scope.job_.clientID) {
          scope.client = User_(scope.job_.clientID);
        // add this as a job on the client side
        scope.client.$loaded().then(function() {
          scope.client.makeJob(scope.job.$id);
        });
        }
        
      };     

      scope.save = function() {
        jobs__.updateJob(scope.job_).then(function(updated) {
          console.log(scope.job_);
          console.log('updated');
        });       
      };

      scope.saveSubjects = function(subjects) {
        scope.job_.subjects = mapSubjects(subjects);
        console.log(scope.job_);
        scope.save();
        //ref.child('subjects').set(fbMethods.takeArrayReturnFbObject(model));
      };

      function mapSubjects(subjects) {
        var ret = {};
        for (var i = 0; i < subjects.length; i++) {
          ret[subjects[i]] = true
        }
        return ret;
      }



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
