'use strict';

describe('Directive: profileBox', function () {

  // load the directive's module
  beforeEach(module('laoshiListApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<profile-box></profile-box>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the profileBox directive');
  }));
});
