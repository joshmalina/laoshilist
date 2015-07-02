'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:llJobApplicants
 * @description
 * # llJobApplicants
 */
angular.module('laoshiListApp')
  .directive('llJobApplicants', ['Job_', 'User_', 'countries', 'users', 'apply', function (Job_, User_, countries, users, apply) {

  	function link (scope) {  		

      scope.countries = countries;
  		
      scope.job = Job_(scope.jobid);

      var applicants = scope.job.getApplicants();

      // consider factoring this out to job_
      
      function updateApplicantList() {
        applicants.$loaded().then(function(list) {
          scope.applicants_ = list.map(function(app) {
            return User_(app.$id);
            // var user = User_(app.$id);
            // user.$loaded().then(function(u) {
            //   return {
            //     user: u,
            //     when: app.$value || app.when || u.appliedTo[scope.jobid].when
            //   }
            // })            
          });
          console.log(scope.applicants_);
        });
      }

      // do this once when page loads
      // ideally this would happen on child_added all over
      updateApplicantList();

      scope.addApplicant = function(appID) {
        // update list on job
        //scope.job.addApplicant(appID);
        // update list on applicant
        //User_(appID).applyTo(scope.job.$id);
        apply.addApplicant(appID, scope.jobid);

        // update list
        updateApplicantList();
      }

      scope.deleteApplicant = function(idx) {
        applicants.$remove(idx);
        updateApplicantList();
      }

      scope.requestInterview = function() {
        // pass request to mandrill to choose time to interview
      }

      scope.sendCVtoClient = function() {
        // mandrill request
      }

      scope.rejectCandidate = function(idx) {
        applicants[idx].rejected = true;
        applicants.$save();
        updateApplicantList();
      }

      // if canAdd is true

        // initialize new applicant model
        scope.newApplicant = null;

        // pass in teachers
        scope.teachers = users.getTeachers();

  	}

    return {
      templateUrl: 'views/templates/jobApplicants.html',
      restrict: 'E',
      scope: {
      	jobid: '=',
        canAdd: '='
      },
      link: link      
    };
  }]);
