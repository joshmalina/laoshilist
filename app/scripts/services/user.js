'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.user
 * @description
 * # user
 * Service in the laoshiListApp.
 */
angular.module('laoshiListApp')
  .factory('user', ['$firebaseObject', 'firebasePath', function ($firebaseObject, firebasePath) {
  	

  	var user = function(userID) {
  		this.userID = userID;
  	};

  	user.prototype.getInfo = function() {
  		
  		var self = this;

  		var url = firebasePath + '/users/' + this.userID;

  		var ref = new Firebase (url);

  		var obj = $firebaseObject(ref);

  		return obj;
  		
  	}

    // // instantiate our initial object
    // var user = function(username) {
    //     this.userID = userID;
    //     this.profile = null;
    // };

    // // define the getProfile method which will fetch data
    // // from GH API and *returns* a promise
    // SimpleGithubUser.prototype.getProfile = function() {

    //     // Generally, javascript callbacks, like here the $http.get callback,
    //     // change the value of the "this" variable inside it
    //     // so we need to keep a reference to the current instance "this" :
    //     var self = this;

    //     return $http.get(apiUrl + 'users/' + this.username).then(function(response) {

    //         // when we get the results we store the data in user.profile
    //         self.profile = response.data

    //         // promises success should always return something in order to allow chaining
    //         return response;

    //     });
    // };
    // return SimpleGithubUser;


    
    return user;

  }]);
