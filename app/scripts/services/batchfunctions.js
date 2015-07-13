'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.batchFunctions
 * @description
 * # batchFunctions
 * Factory in the laoshiListApp.
 */
angular.module('laoshiListApp')
  .factory('batchFunctions', function () {

    var selectedObjects = [];    

    function toggleSelect(obj) {

      var idx = selectedObjects.indexOf(obj);

      if(idx > -1) {
        selectedObjects.splice(idx, 1);
      } else {
        selectedObjects.push(obj);
      }     

    }

    // takes a function for some fold, returns a promise
    // could be used to delete from some db, or send them all some mail
    function foldAndDeselect(someFunc) {  
      
      // iterate through the objects
      selectedObjects.forEach(function(obj, idx) {

        // apply some function
        someFunc(obj).then(function() {

          // remove from pool of selected
          selectedObjects.splice(idx, 1);

        });

      
       })


    }
   

    // Public API here
    return {
      toggleSelect: function (obj) {
        return toggleSelect(obj);
      },
      foldAndDeselect: function(someFunction) {
        return foldAndDeselect(someFunction)
      },
      selectedObjects: function() {
        return selectedObjects;
      }
    };
  });
