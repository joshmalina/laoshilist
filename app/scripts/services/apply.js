'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.apply
 * @description
 * # apply
 * Factory in the laoshiListApp.
 */
angular.module('laoshiListApp')
  .factory('apply', ['User_', 'Job_', '$q', function (User_, Job_, $q) {

   function applySuccessEmail() {
    // contact server
   }
   
   function addApplicant(user_id, job_id, note) {

    var defer = $q.defer();

    if(!user_id || !job_id) {
      defer.reject('user_id || job_id === false');
    }

    var user = User_(user_id);
    var job = Job_(job_id);

    // would like to be able to do this atomically
    user.$loaded().then(function() {
      job.$loaded().then(function() {
        if(user && job) {
          var userError = user.applyTo(job.$id, note);          
          if(!userError) {
            var jobError = job.addApplicant(user.$id);
            if(jobError) {
              defer.reject('application added to user record but not job record'); 
            } else {
              defer.resolve('Application successfully submitted');
            }
          } else {
            defer.reject('application not added to user record')
          }
        }

      })
    })

    return defer.promise;

   }

    // Public API here
    return {
      addApplicant: function (user_id, job_id, note) {
        return addApplicant(user_id, job_id, note);
      }
    };
  }]);
