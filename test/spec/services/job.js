'use strict';

describe('Service: job', function () {

  // load the service's module
  beforeEach(module('laoshiListApp'));

  // instantiate service
  var job;
  beforeEach(inject(function (_job_) {
    job = _job_;
  }));

  it('should do something', function () {
    expect(!!job).toBe(true);
  });

});
