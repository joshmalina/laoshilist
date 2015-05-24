'use strict';

describe('Service: languageLevel', function () {

  // load the service's module
  beforeEach(module('laoshiListApp'));

  // instantiate service
  var languageLevel;
  beforeEach(inject(function (_languageLevel_) {
    languageLevel = _languageLevel_;
  }));

  it('should do something', function () {
    expect(!!languageLevel).toBe(true);
  });

});
