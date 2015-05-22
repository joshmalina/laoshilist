'use strict';

describe('Directive: countrySelect', function () {

  // load the directive's module
  beforeEach(module('laoshiListApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<country-select></country-select>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the countrySelect directive');
  }));
});
