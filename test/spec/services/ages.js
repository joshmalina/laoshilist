'use strict';

describe('Service: ages', function () {

  // load the service's module
  beforeEach(module('laoshiListApp'));

  // instantiate service
  var ages;
  beforeEach(inject(function (_ages_) {
    ages = _ages_;
  }));

  it('should do something', function () {
    expect(!!ages).toBe(true);
  });

});
