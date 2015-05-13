'use strict';

describe('Directive: llPublicJob', function () {

  // load the directive's module
  beforeEach(module('laoshiListApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ll-public-job></ll-public-job>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the llPublicJob directive');
  }));
});
