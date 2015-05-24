'use strict';

describe('Service: degrees', function () {

  // load the service's module
  beforeEach(module('laoshiListApp'));

  // instantiate service
  var degrees;
  beforeEach(inject(function (_degrees_) {
    degrees = _degrees_;
  }));

  it('should do something', function () {
    expect(!!degrees).toBe(true);
  });

});
