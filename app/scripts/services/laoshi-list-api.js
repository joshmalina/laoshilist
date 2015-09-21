'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.laoshiListApi
 * @description of course we probably should be doing this on the server side so it can't be fucked with by hackers
 * # laoshiListApi
 * Factory in the laoshiListApp.
 */
 angular.module('laoshiListApp')
 .factory('laoshiListApi', ['Upload', '$http', '$q', 'User_', function (Upload, $http, $q, User_) {

  var basePathToAPI = 'http://localhost:3000/api/';
  //basePathToAPI = 'http://laoshilist-server-dev3.elasticbeanstalk.com/api/';
  //basePathToAPI = 'http://188.166.248.93:3000/api/'

  var expectedCVfileTypes = ['application/x-iwork-pages-sffpages', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'application/pdf', 'txt', 'text/rtf', 'text/plain'];
  var expectedCVsize = 1000000;

  function email(applicant, job) {

    var path = basePathToAPI + 'applySuccess' + '?applicant_email=' + applicant.loginEmail + '&applicant_name=' + applicant.getFullestName() + '&job_title=' + job.title + '&job_desc=' + job.longDesc + '&job_id=' + job.$id;
    $http.post(path).then(function(response) {
      console.log(response);
    })
  }

  function expectedType(file, typeExpectations) {   
    var a = typeExpectations.indexOf(file.type) > -1;
    console.log('expected type', a);
    console.log(file.type);
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
    var user = User_(userID);
    return user.$loaded().then(function(u) {
      var path = basePathToAPI + 'sign?username=' + u.getFullestName() + '&file_type=' + file.type + '&userID=' + userID;
      return path;
    });

  }

  function getCoverLetterPath(file, userID, username, jobTitle) {
    
    // remove promise from other one
    var defer = $q.defer();
    // i think there is a function for writing out these get paramaters rather than writing the url by hand
    var path = basePathToAPI + 'coverLetter?username=' + username + '&file_type=' + file.type + '&jobtitle=' + jobTitle + '&userID=' + userID;
  
    defer.resolve(path);

    return defer.promise;
  }


  function getSignedURL(file, userID, path) {

   var deffered = $q.defer();

   path.then(function(promise) {

    $http.get(promise).then(function(resp) {

      var xhr = new XMLHttpRequest();

      // probably need some additional handling
      xhr.addEventListener("error", errorHandler, false);

      function errorHandler(event) {
        console.log(event);
        deffered.reject(event);
      }

      console.log(xhr.status);

      xhr.open('PUT', resp.data.signed_request, true);

      if(file.text) {
        file = new Blob([file.text], {type:'text/plain'});
      }

      console.log(file);

      xhr.send(file); 

      xhr.onreadystatechange = function(e) {
        console.log(xhr.status);

        console.log(e);
        if(this.readyState === 4) {
          deffered.resolve(resp.data.url_);                  
        }                                   
      };      

    });

   })   

    return deffered.promise;
  }

  /* older implementation had us storing a document in S3;
   * now we're just going to throw the text blob into
   * firebase
   */
  function uploadCoverLetter(letter, userID, username, jobTitle) {

    var defer = $q.defer();

    

    // console.log(letter);

    // var path = getCoverLetterPath(letter, userID, username, jobTitle);

    // getSignedURL(letter, userID, path).then(function(url) {
    //   defer.resolve(url);
    // }, function(error) {
    //   defer.reject(error);
    // });

    return defer.promise;
  }

  function updateExtensionOfCV(userID, extension) {

    var user = User_(userID);
    return user.$loaded().then(function(u) {
      u.cv = extension;
      u.$save();
    });

  }

  // return the path to the uploaded file, or an error message
  function uploadCV(files, userID) {

    var defer = $q.defer();

    var url = basePathToAPI + 'resume'

    var options = {
      url: url,
      fields: {'userid': userID, 'filekind' : 'resume'},
      file: files,
      method: 'POST'
    }

    Upload.upload(options).success(function (data, status, headers, config) {

      console.log(data);

      var extension = data;
      var path_to_cv = url + '?userid=' + userID + '&extension=' + extension;

      updateExtensionOfCV(userID, extension);

      defer.resolve(path_to_cv);     
      

    }).error(function (data, status, headers, config) {
        console.log('error status: ' + status);
        console.log(data);
        var error = 'there has been an error';

      defer.reject(error);
    })

    return defer.promise;


    // old way of doing things
    // var defer = $q.defer();

    // if(filesMakeSense(files, expectedCVfileTypes, expectedCVsize)) {

    //   var file = files[0];

    //   var path = getCVPath(file, userID);

    //   getSignedURL(file, userID, path).then(function(url) {
    //     defer.notify('crabsss');
    //     defer.resolve(url);
    //   }, function(error) {
    //     defer.reject(error);
    //   });
    // } else {
    //   if(files.length > 0) {
    //     defer.reject('Your file is either too large or not the right kind. CVs may be in the following forms: pdf, txt, rtf, pages, doc, docx');
    //   }
    // }

    // return defer.promise;

  }

    // Public API here
    return {
      uploadCV: function (files, userID) {
        return uploadCV(files, userID);
      },
      uploadCoverLetter: function(letter, userID, username, jobTitle) {
        return uploadCoverLetter(letter, userID, username, jobTitle);
      },
      email: function(applicant, job) {
        return email(applicant, job)
      }

    };
  }]);
