'use strict';

describe('Service: baiduMapsKey', function () {

  // load the service's module
  beforeEach(module('laoshiListApp'));

  // instantiate service
  var baiduMapsKey;
  beforeEach(inject(function (_baiduMapsKey_) {
    baiduMapsKey = _baiduMapsKey_;
  }));

  it('should do something', function () {
    expect(!!baiduMapsKey).toBe(true);
  });

});
