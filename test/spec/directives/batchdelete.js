'use strict';

describe('Directive: batchDelete', function () {

  // load the directive's module
  beforeEach(module('laoshiListApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<batch-delete></batch-delete>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the batchDelete directive');
  }));
});
