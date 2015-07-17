'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.payment
 * @description
 * # payment
 * Factory in the laoshiListApp.
 */
angular.module('laoshiListApp')
  .factory('payment', ['firebasePath', '$firebaseObject', function (firebasePath, $firebaseObject) {
    
    var ref = new Firebase (firebasePath + '/payments');


    var payment = $firebaseObject.$extend({
      getLiability: function() {
        

      },
      getInvestment: function() {

      },
      getProfit: function() {

      }
    });

    return function(payID) {
      return new payment(ref.child(payID));
    }

   
  }]);
