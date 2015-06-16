'use strict';

describe('Service: Mandrill', function () {

  // load the service's module
  beforeEach(module('laoshiListApp'));

  // instantiate service
  var Mandrill;
  beforeEach(inject(function (_Mandrill_) {
    Mandrill = _Mandrill_;
  }));

  it('should do something', function () {
    expect(!!Mandrill).toBe(true);
  });

});
