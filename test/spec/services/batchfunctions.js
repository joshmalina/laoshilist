'use strict';

describe('Service: batchFunctions', function () {

  // load the service's module
  beforeEach(module('laoshiListApp'));

  // instantiate service
  var batchFunctions;
  beforeEach(inject(function (_batchFunctions_) {
    batchFunctions = _batchFunctions_;
  }));

  it('should do something', function () {
    expect(!!batchFunctions).toBe(true);
  });

});
