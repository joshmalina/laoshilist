'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.username
 * @description
 * # username
 * Factory in the laoshiListApp.
 */
 angular.module('laoshiListApp')
 .factory('username', ['firebasePath', function (firebasePath) {

    // takes a string (i.e. user's first name), assuming it's already been validated 
    // attach a random string to the end
    // check that it isn't already a username
    // returns the unique username

    // random string maker
    var makeID = function () {

        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for( var i=0; i < 5; i++ ) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    };

    var checkAndFinalizeUserName = function(name) {

      // make new username
      var uName = name + '_' + makeID();

      // get all usernames
      var ref = new Firebase(firebasePath + '/users');     

      // return all records with this username
      var q = ref.orderByKey().equalTo(uName);

      // evaluate what has been returned
      q.once('value', function(snapshot) {

        if (snapshot.val() !== null) {
          checkAndFinalizeUserName(name);
        }        
          
      });

      return uName;

    };   

    

    // Public API here
    return {
      // assumes name does not include bad chars or spaces which are not usable as keys by firebase,
      new: function (name) {
        return checkAndFinalizeUserName(name);
      }
    };
  }]);
