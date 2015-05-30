'use strict';

describe('Filter: jobsFilter', function () {

  // load the filter's module
  beforeEach(module('laoshiListApp'));

  // initialize a new instance of the filter before each test
  var jobsFilter;
  beforeEach(inject(function ($filter) {
    jobsFilter = $filter('jobsFilter');
  }));

  it('should return the input prefixed with "jobsFilter filter:"', function () {
    var text = 'angularjs';
    expect(jobsFilter(text)).toBe('jobsFilter filter: ' + text);
  });

});
