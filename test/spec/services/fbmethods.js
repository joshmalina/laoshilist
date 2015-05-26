'use strict';

describe('Service: fbMethods', function () {

  // load the service's module
  beforeEach(module('laoshiListApp'));

  // instantiate service
  var fbMethods;
  beforeEach(inject(function (_fbMethods_) {
    fbMethods = _fbMethods_;
  }));

  it('should do something', function () {
    expect(!!fbMethods).toBe(true);
  });

});
