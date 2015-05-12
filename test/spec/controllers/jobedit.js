'use strict';

describe('Controller: JobeditCtrl', function () {

  // load the controller's module
  beforeEach(module('laoshiListApp'));

  var JobeditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JobeditCtrl = $controller('JobeditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
