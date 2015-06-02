'use strict';

describe('Directive: explode', function () {

  // load the directive's module
  beforeEach(module('laoshiListApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<explode></explode>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the explode directive');
  }));
});
