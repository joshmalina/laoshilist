'use strict';

describe('Service: llConstants', function () {

  // load the service's module
  beforeEach(module('laoshiListApp'));

  // instantiate service
  var llConstants;
  beforeEach(inject(function (_llConstants_) {
    llConstants = _llConstants_;
  }));

  it('should do something', function () {
    expect(!!llConstants).toBe(true);
  });

});
