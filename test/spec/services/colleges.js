'use strict';

describe('Service: colleges', function () {

  // load the service's module
  beforeEach(module('laoshiListApp'));

  // instantiate service
  var colleges;
  beforeEach(inject(function (_colleges_) {
    colleges = _colleges_;
  }));

  it('should do something', function () {
    expect(!!colleges).toBe(true);
  });

});
