'use strict';

describe('Service: ethnicities', function () {

  // load the service's module
  beforeEach(module('laoshiListApp'));

  // instantiate service
  var ethnicities;
  beforeEach(inject(function (_ethnicities_) {
    ethnicities = _ethnicities_;
  }));

  it('should do something', function () {
    expect(!!ethnicities).toBe(true);
  });

});
