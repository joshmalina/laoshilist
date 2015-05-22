'use strict';

describe('Controller: ProfileEditCtrl', function () {

  // load the controller's module
  beforeEach(module('laoshiListApp'));

  var ProfileEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfileEditCtrl = $controller('ProfileEditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
