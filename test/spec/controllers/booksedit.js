'use strict';

describe('Controller: BookseditCtrl', function () {

  // load the controller's module
  beforeEach(module('laoshiListApp'));

  var BookseditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BookseditCtrl = $controller('BookseditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
