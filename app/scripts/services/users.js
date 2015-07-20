'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.users
 * @description
 * # users
 * Factory in the laoshiListApp.
 */
 angular.module('laoshiListApp')
 .factory('users', ['firebasePath', '$firebaseArray', 'roles', 'fbMethods', '$q', function (firebasePath, $firebaseArray, roles, fbMethods, $q) {     

    // ref to all users
    var userRef = new Firebase(firebasePath + '/users');

    // should also add roles {teacher: true}
    function addNew(firstName, loginEmail) {
      return $firebaseArray(userRef).$add({
        firstName: firstName,
        loginEmail: loginEmail,
        dateAdded: fbMethods.getTime()
      });
    }     

    function returnKind(kind) {     

      // empty array
      var naiveUsers = [];

      // query DB
      userRef.orderByChild('firstName').on('value', function(querySnapshot) {
        querySnapshot.forEach(function(userSnap) {         

          // if we have one of this kind
          if(userSnap.child('roles').child(roles.indexOf(kind)).val() === true) {

            // set to var
            var user = userSnap.val();

            // append id for use in controllers
            user.id = userSnap.key();

            if(userSnap.val().jobs) {
              var jobs = userSnap.val().jobs;
              var firstKey = Object.keys(jobs)[0];
              user.firstJobID = firstKey;
            }

            if(userSnap.val().contact) {

              // just a way to add some basic contact information to the record, so that it is easily
              // accessible without knowning the firebase ID

              var contact = userSnap.val().contact;
              var entries = Object.keys(userSnap.val().contact);

              user.email = contact[entries[0]].email || null;
              user.phone = contact[entries[0]].phone || null;
              user.wechat = contact[entries[0]].wechat || null;

            }

           // add to array
           naiveUsers.push(user);

         }          
       });
      });

      return naiveUsers;
    }

    // iterate through the users, see if an applicant has already applied to a job
    // with an extant email
    // if so, return id; if not, return false
    function emailExists (email) {

      var defer = $q.defer();

      userRef.orderByChild('loginEmail').equalTo(email).once('value', function(snapshot) {

        if(snapshot.exists() && snapshot.numChildren() === 1) {
          snapshot.forEach(function(childSnapshot) {
            defer.resolve(childSnapshot.key());
          })
        } else {
          defer.reject();
        }
      });

      return defer.promise;
    }

    // Public API here
    return {
      addNew: function(firstName, loginEmail) {
        return addNew(firstName, loginEmail);
      },
      getAllUsers: function() {
        return $firebaseArray(userRef.orderByChild('firstName'));
      },
      getAdmins: function() {
        return returnKind('Admin');
      },
      getTeachers: function () {
        return returnKind('Teacher');
      },
      getClients: function() {
        return returnKind('Client');
      },      
      get: function(kind) {
        return returnKind(kind);
      },
      emailExists: function(email) {
        return emailExists(email);
      }
    };
  }]);
