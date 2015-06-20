'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.laoshiListApi
 * @description of course we probably should be doing this on the server side so it can't be fucked with by hackers
 * # laoshiListApi
 * Factory in the laoshiListApp.
 */
 angular.module('laoshiListApp')
 .factory('laoshiListApi', ['Upload', '$http', '$q', function (Upload, $http, $q) {

  var basePathToAPI = 'http://localhost:3000/api/';

  var expectedCVfileTypes = ['application/x-iwork-pages-sffpages', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'application/pdf', 'txt', 'text/rtf', 'text/plain'];
  var expectedCVsize = 1000000;

  function expectedType(file, typeExpectations) {   
    var a = typeExpectations.indexOf(file.type) > -1;
    console.log(a);
    return a;
  }

  function expectedSize(file, sizeExpectation) {
    return file.size <= sizeExpectation;
  }

  function exists(files) {      
    return files && files.length;
  }

  function filesMakeSense(files, typeExpectations, sizeExpectation) { 
    if (exists(files)) {
      var file = files[0];
      if(expectedType(file, typeExpectations) && expectedSize(file, sizeExpectation)) {
        return true;
      }
    }
    return false;      
  }

  function getCVPath(file, userID) {
    var path = basePathToAPI + 'sign?file_name=' + file.name + '&file_type=' + file.type + '&userID=' + userID;
    console.log(path);
    return path;
  }


  function getSignedURL(file, userID, path) {

   var deffered = $q.defer();

    $http.get(path).then(function(resp) {

      var xhr = new XMLHttpRequest();

      // probably need some additional handling
      xhr.addEventListener("error", errorHandler, false);

      function errorHandler(event) {
        console.log(event);
        deffered.reject(event);
      }


      xhr.open('PUT', resp.data.signed_request, true);

      xhr.send(file); 

      xhr.onreadystatechange = function(e) {
        console.log(e);
        if(this.readyState === 4) {
          deffered.resolve(resp.data.url_);                  
        }                                   
      };      

    });

    return deffered.promise;
  }

  function uploadCV(files, userID) {

    var defer = $q.defer();

    if(filesMakeSense(files, expectedCVfileTypes, expectedCVsize)) {

      var file = files[0];

      var path = getCVPath(file, userID);

      getSignedURL(file, userID, path).then(function(url) {
        defer.resolve(url);
      }, function(error) {
        defer.reject(error);
      });
    } else {
      defer.reject('Your file is either too large or not the right kind.');
    }

    return defer.promise;

  }

    // Public API here
    return {
      uploadCV: function (files, userID) {
        return uploadCV(files, userID);
      }
    };
  }]);
