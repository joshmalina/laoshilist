'use strict';

describe('Service: laoshiListApi', function () {

  // load the service's module
  beforeEach(module('laoshiListApp'));

  // instantiate service
  var laoshiListApi;
  beforeEach(inject(function (_laoshiListApi_) {
    laoshiListApi = _laoshiListApi_;
  }));

  it('should do something', function () {
    expect(!!laoshiListApi).toBe(true);
  });

});
