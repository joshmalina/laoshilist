'use strict';

describe('Service: firebasePath', function () {

  // load the service's module
  beforeEach(module('laoshiListApp'));

  // instantiate service
  var firebasePath;
  beforeEach(inject(function (_firebasePath_) {
    firebasePath = _firebasePath_;
  }));

  it('should do something', function () {
    expect(!!firebasePath).toBe(true);
  });

});
