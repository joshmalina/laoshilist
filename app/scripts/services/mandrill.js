'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.Mandrill
 * @description
 * # Mandrill
 * Factory in the laoshiListApp.
 */
angular.module('laoshiListApp')
  .factory('Mandrill', ['$http', function ($http) {
    
    var testMail = function(resp, msg) {
      return $http.post('http://localhost:3000/api/mail', {
        'data': resp, 
        'message': msg
      })
      .success(function(data, status, headers, config) {
        return data;
      });
    }

    // Public API here
    return {
      test: function (resp, msg) {
        return testMail(resp, msg);
      }
    };
  }]);

