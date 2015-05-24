'use strict';

describe('Service: majors', function () {

  // load the service's module
  beforeEach(module('laoshiListApp'));

  // instantiate service
  var majors;
  beforeEach(inject(function (_majors_) {
    majors = _majors_;
  }));

  it('should do something', function () {
    expect(!!majors).toBe(true);
  });

});
