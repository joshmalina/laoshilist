'use strict';

/**
 * @ngdoc overview
 * @name laoshiListApp
 * @description
 * # laoshiListApp
 *
 * Main module of the application.
 */
 angular
 .module('laoshiListApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'firebase',
  'ui.bootstrap',
  'monospaced.elastic'
  ])
 .config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl',
    resolve: {
      // controller will not be loaded until $waitForAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth", function(Auth) {
        // $waitForAuth returns a promise so the resolve waits for it to complete
        return Auth.$requireAuth();
      }]
    }
  })
  .when('/about', {
    templateUrl: 'views/about.html',
    controller: 'AboutCtrl'
  })
  .when('/jobs', {
    templateUrl: 'views/jobs.html',
    controller: 'JobsCtrl',
    resolve: {
      // controller will not be loaded until $waitForAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth", function(Auth) {
        // $waitForAuth returns a promise so the resolve waits for it to complete
        return Auth.$requireAuth();
      }]
    }
  })
  .when('/jobEdit', {
    templateUrl: 'views/jobedit.html',
    controller: 'JobeditCtrl',
    resolve: {
      // controller will not be loaded until $waitForAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth", function(Auth) {
        // $waitForAuth returns a promise so the resolve waits for it to complete
        return Auth.$requireAuth();
      }]
    }
  })
  .when('/users', {
    templateUrl: 'views/users.html',
    controller: 'UsersCtrl',
    resolve: {
      // controller will not be loaded until $waitForAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth", function(Auth) {
        // $waitForAuth returns a promise so the resolve waits for it to complete
        return Auth.$requireAuth();
      }]
    }
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl',
    resolve: {
      // controller will not be loaded until $waitForAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth", function(Auth) {
        // $waitForAuth returns a promise so the resolve waits for it to complete
        return Auth.$waitForAuth();
      }]
    }
  })
  .when('/register', {
    templateUrl: 'views/register.html',
    controller: 'RegisterCtrl',
    resolve: {
      // controller will not be loaded until $waitForAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth", function(Auth) {
        // $waitForAuth returns a promise so the resolve waits for it to complete
        return Auth.$requireAuth();
      }]
    }
  })
  .when('/profile/:username', {
    templateUrl: 'views/profile.html',
    controller: 'ProfileCtrl',
    resolve: {
      // controller will not be loaded until $waitForAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth", function(Auth) {
        // $waitForAuth returns a promise so the resolve waits for it to complete
        return Auth.$requireAuth();
      }]
    }
  })
  .when('/profile_edit/:username', {
    templateUrl: 'views/profile_edit.html',
    controller: 'ProfileEditCtrl',
    resolve: {
      // controller will not be loaded until $waitForAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth", function(Auth) {
        // $waitForAuth returns a promise so the resolve waits for it to complete
        return Auth.$requireAuth();
      }]
    }
  })
  .when('/jobview', {
    templateUrl: 'views/jobview.html',
    controller: 'JobviewCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });  
})

.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
  // We can catch the error thrown when the $requireAuth promise is rejected
  // and redirect the user back to the home page
  if (error === "AUTH_REQUIRED") {
    $location.path("/login");
  }
});
}]);


