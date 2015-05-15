'use strict';

describe('Filter: capitalizeFirst', function () {

  // load the filter's module
  beforeEach(module('laoshiListApp'));

  // initialize a new instance of the filter before each test
  var capitalizeFirst;
  beforeEach(inject(function ($filter) {
    capitalizeFirst = $filter('capitalizeFirst');
  }));

  it('should return the input prefixed with "capitalizeFirst filter:"', function () {
    var text = 'angularjs';
    expect(capitalizeFirst(text)).toBe('capitalizeFirst filter: ' + text);
  });

});
