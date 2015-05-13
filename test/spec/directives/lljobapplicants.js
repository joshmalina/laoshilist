'use strict';

describe('Directive: llJobApplicants', function () {

  // load the directive's module
  beforeEach(module('laoshiListApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ll-job-applicants></ll-job-applicants>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the llJobApplicants directive');
  }));
});
