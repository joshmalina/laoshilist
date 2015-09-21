'use strict';

describe('Service: apiPath', function () {

  // load the service's module
  beforeEach(module('laoshiListApp'));

  // instantiate service
  var apiPath;
  beforeEach(inject(function (_apiPath_) {
    apiPath = _apiPath_;
  }));

  it('should do something', function () {
    expect(!!apiPath).toBe(true);
  });

});
