'use strict';

describe('Directive: applyBox', function () {

  // load the directive's module
  beforeEach(module('laoshiListApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<apply-box></apply-box>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the applyBox directive');
  }));
});
