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
  'ui.map'
  ])
 .config(function ($routeProvider, uiMapLoadParamsProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  })
  .when('/about', {
    templateUrl: 'views/about.html',
    controller: 'AboutCtrl'
  })
  .when('/jobs', {
    templateUrl: 'views/jobs.html',
    controller: 'JobsCtrl'
  })
  .when('/jobEdit', {
    templateUrl: 'views/jobedit.html',
    controller: 'JobeditCtrl'
  })
  .when('/users', {
    templateUrl: 'views/users.html',
    controller: 'UsersCtrl'
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl'
  })
  .when('/register', {
    templateUrl: 'views/register.html',
    controller: 'RegisterCtrl'
  })
  .when('/profile/:username', {
    templateUrl: 'views/profile.html',
    controller: 'ProfileCtrl'
  })
  .when('/profile_edit/:username', {
    templateUrl: 'views/profile_edit.html',
    controller: 'ProfileEditCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
  uiMapLoadParamsProvider.setParams({
    v: '2.0',
    ak:'xxxx'
  });
});


