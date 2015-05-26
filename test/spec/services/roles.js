'use strict';

describe('Service: roles', function () {

  // load the service's module
  beforeEach(module('laoshiListApp'));

  // instantiate service
  var roles;
  beforeEach(inject(function (_roles_) {
    roles = _roles_;
  }));

  it('should do something', function () {
    expect(!!roles).toBe(true);
  });

});
