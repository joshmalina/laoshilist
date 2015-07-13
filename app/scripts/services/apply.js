'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.apply
 * @description
 * # apply
 * Factory in the laoshiListApp.
 */
angular.module('laoshiListApp')
  .factory('apply', ['User_', 'Job_', '$q', 'laoshiListApi', function (User_, Job_, $q, laoshiListApi) {

   function applySuccessEmail() {
    // contact server
   }

   function instantiateUserAndJob(uid, jid) {
    
    var defer = $q.defer();

    if(!uid || !jid) {
      defer.reject('user id or job id missing');
    }

    var user = User_(uid),
        job = Job_(jid);

    user.$loaded().then(function() {
      job.$loaded().then(function() {
        if(user && job) {
          defer.resolve({u: user, j: job});
        }
      })
    })

    return defer.promise;


   }

   function removeApplicant(userid, jobid) {

      var defer = $q.defer();

      instantiateUserAndJob(userid, jobid).then(function(combo) {
        combo.j.deleteApplicant(userid);
        combo.u.dontApply(jobid);
      });

      defer.resolve('');

      return defer.promise;

   }

   /* @name: addApplicant
    * @param: userid, jobid, coverletter=optional
    * @desc:  combines the add on the job side and user side
    * would be nice if they could happen atomically 
    * should also make space on s3 for a cover letter
    * and return a signed url for one if present
    */
   function addApplicant(user_id, job_id, note) {

    // return a promise
    var defer = $q.defer();

    // it should never get this far, but if it does
    if(!user_id || !job_id) {
      // the plan is for all these reject messages to be logged and sent to the admin
      defer.reject('user_id || job_id === false');
    }    

    var user = User_(user_id),
        job = Job_(job_id);

    // wait for user object to load
    user.$loaded().then(function() {

      // wait for job object to load
      job.$loaded().then(function() {

        // if both have loaded
        if(user && job) {

          // apply on the user side, return an error
          var userError = user.applyTo(job.$id, note);        

          // if no user error
          if(!userError) {

            // apply on the job side
            var jobError = job.addApplicant(user.$id);

            // if there is an error
            if(jobError) {

              // log this error
              defer.reject('application added to user record but not job record'); 

              // send me an email with that error

              // roll back apply on the user side

            // no errors
            } else {

              // if cover letter present
              if(note) {

                // try to get a presigned url
                laoshiListApi.uploadCoverLetter(note, user.$id, user.getFullestName(), job.title).then(
                  // if we got it
                  function(url) {

                    // save to db
                    user.appliedTo[job.$id].note = url;
                    user.$save();

                    // couldn't get url
                }, function(error) {

                    console.log(error);
                    defer.reject('Cover letter upload failure');
                })
              } 

                // let them know
                defer.resolve('Application successfully submitted');

                // send an email        
                laoshiListApi.email(user, job);
              
            }

          // if there was an error adding to the user record
          } else {

            // send me an email with this error, log it
            defer.reject('application not added to user nor job');
          }
        }

      })
    })

    // return the good or bad news
    return defer.promise;

   }

    // Public API here
    return {
      addApplicant: function (user_id, job_id, note) {
        return addApplicant(user_id, job_id, note);
      },
      removeApplicant: function(jid, uid) {
        return removeApplicant(uid, jid);
      }
    };
  }]);
