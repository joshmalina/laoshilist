'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.users
 * @description
 * # users
 * Factory in the laoshiListApp.
 */
 angular.module('laoshiListApp')
 .factory('users', ['firebasePath', '$firebaseArray', 'roles', 'fbMethods', function (firebasePath, $firebaseArray, roles, fbMethods) {     

    // ref to all users
    var userRef = new Firebase(firebasePath + '/users');

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

           // add to array
           naiveUsers.push(user);

         }          
       });
      });

      return naiveUsers;
    }

    // Public API here
    return {
      addNew: function(firstName, loginEmail) {
        return addNew(firstName, loginEmail);
      },
      getAllUsers: function() {
        return $firebaseArray(userRef);
      },
      getAdmins: function() {
        return returnKind('Admin');
      },
      getTeachers: function () {
        return returnKind('Teacher');
      },
      getClients: function() {
        return returnKind('Client');
      }
    };
  }]);
