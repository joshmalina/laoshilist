'use strict';

describe('Service: jobStatus', function () {

  // load the service's module
  beforeEach(module('laoshiListApp'));

  // instantiate service
  var jobStatus;
  beforeEach(inject(function (_jobStatus_) {
    jobStatus = _jobStatus_;
  }));

  it('should do something', function () {
    expect(!!jobStatus).toBe(true);
  });

});
