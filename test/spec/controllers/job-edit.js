'use strict';

describe('Controller: JobEditCtrl', function () {

  // load the controller's module
  beforeEach(module('laoshiListApp'));

  var JobEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JobEditCtrl = $controller('JobEditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
