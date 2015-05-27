'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.fbMethods
 * @description
 * # fbMethods
 * Factory in the laoshiListApp.
 */
 angular.module('laoshiListApp')
 .factory('fbMethods', function () {

    /* 
     * adds a temporary placeholder for
     * an array ref; firebase does not
     * allow completely empty objects
     * to exist
     */
     var addEmpty = function(arrayRef) {
      arrayRef.$add('null');
    };

    /*
     * this function takes firebase data, aka an object with a bunch
     * of meaningful keys, like {chinese: true, english: true}, and
     * a bunch of non-sense values, as in 'true', 'true', etc...
     *
     * it returns nothing, but it's side effect is to set the value
     * of a scope-bound array -- would be nice if it did return something
     * for the sake of unit testing
     * 
     * it should take an empty scope bound array, such as
     * fbObjToArray(firebase.data.object, $scope.array = [])
     */
     var fbObjToArray = function(startObject, scopeArray) {     
      // iterate through object
      for(var k in startObject) {
        // build array
        scopeArray.push(k);
      }
    };

    /* 
     * This function takes an array of data, perhaps from a multiple select
     * input, and converts it into a firebase object, where each array item
     * becomes an object key with the value true. It also takes the firebase
     * references, as well as the child name
     *
     * For example, if the @param array = ['cats', 'dogs', 'parrots'], it is
     * changed to {cats: true, dogs: true, parrots: true} before updating
     */
     var saveArrayToFbObject = function(model, ref) {
      var o = {};
      var l = model.length;
      for (var i = 0; i < l; i++) {
        o[model[i]] = true;
      }
      ref.set(o);
    };

    /* 
     * a similar function to saveArrayToFbObject, but instead we just return the object
     * and let the caller do the saving; this way we have an output we can test
     */
     var takeArrayReturnFbObject = function(model) {
      var o = {};
      var l = model.length;
      for (var i = 0; i < l; i++) {
        o[model[i]] = true;
      }
      return o;
     }; 

    /*
     * Get current time on server
     */
     var getTime = function() {
        return Firebase.ServerValue.TIMESTAMP;
     };

    // Public API here
    return {      
      addEmpty: function (arrayRef) {
        return addEmpty(arrayRef);
      },
      fbObjToArray: function(startObject, scopeArray) {
        return fbObjToArray(startObject, scopeArray);
      },
      saveArrayToFbObject: function(model, ref) {
        return saveArrayToFbObject(model, ref);
      },
      getTime: function() {
        return getTime();

      },
      takeArrayReturnFbObject: function(model) {
        return takeArrayReturnFbObject(model);
      }
    };
  });
