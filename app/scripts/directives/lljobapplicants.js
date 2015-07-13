'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:llJobApplicants
 * @description
 * # llJobApplicants
 */
angular.module('laoshiListApp')
  .directive('llJobApplicants', ['Job_', 'User_', 'countries', 'users', 'apply', 'firebasePath', 'batchFunctions', function (Job_, User_, countries, users, apply, firebasePath, batchFunctions) {

  	function link (scope) {  		

      scope.countries = countries;
  		
      scope.job = Job_(scope.jobid);

      scope.applicants = scope.job.getApplicants();

      var ref = new Firebase (firebasePath + '/jobs/' + scope.jobid + '/applicants');

      ref.orderByKey().on('value', function(apps) {
        var applicantIDs = Object.keys(apps.val());       
        scope.applicants_ = applicantIDs.map(function(app) {
          return User_(app);
        });
      });

      scope.toggleSelect = batchFunctions.toggleSelect;       

      scope.deleteApplicants = function() {
        // pass a partially defined remove applicant function
        batchFunctions.foldAndDeselect(function(applicant) {
          return apply.removeApplicant(scope.jobid, applicant.$id);
        });
      };
      



      // batchFunctions.foldAndDeselect(function(applicant) {
      //   scope.applicants.$remove(applicant);
      // });

      scope.addApplicant = function(appID) {
        apply.addApplicant(appID, scope.jobid);       
      }

      scope.deleteApplicant = function(uid, jid) {
        //scope.applicants.$remove(idx);
        apply.removeApplicant(jid, uid);
      }

      scope.requestInterview = function() {
        // pass request to mandrill to choose time to interview
      }

      scope.sendCVtoClient = function() {
        // mandrill request
      }

      scope.rejectCandidate = function(idx) {
        scope.applicants[idx].appliedTo[scope.jobid].rejected = $scope.applicants[idx] === true ? false : true;
        scope.applicants.$save();
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
