'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.laoshiListApi
 * @description of course we probably should be doing this on the server side so it can't be fucked with by hackers
 * # laoshiListApi
 * Factory in the laoshiListApp.
 */
angular.module('laoshiListApp')
  .factory('laoshiListApi', ['Upload', '$http', function (Upload, $http) {
    
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

    function errorHandler(event) {
      console.log(event);
      return 'there was an error';
    }

    function getSignedURL(file, userID, path) {

      $http.get(path).then(function(resp) {
         
          var xhr = new XMLHttpRequest();


          // probably need some additional handling
          xhr.addEventListener("error", errorHandler, false);

          xhr.open('PUT', resp.data.signed_request, true);

          xhr.send(file); 

          xhr.onreadystatechange = function(e) {
            console.log(e);
              if(this.readyState === 4) {
                  return resp.data.url_;                  
              }                                   
          };             

      });
    }

    // Public API here
    return {
      uploadCV: function (files, userID) {
        if(filesMakeSense(files, expectedCVfileTypes, expectedCVsize)) {
          return getSignedURL(files[0], userID, getCVPath(files[0], userID));
        } else {
          return "your file is either too large or not the right kind";
        }   
      }
    };
  }]);
