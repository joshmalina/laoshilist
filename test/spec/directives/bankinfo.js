'use strict';

describe('Directive: bankInfo', function () {

  // load the directive's module
  beforeEach(module('laoshiListApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bank-info></bank-info>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the bankInfo directive');
  }));
});
