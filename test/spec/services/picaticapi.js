'use strict';

describe('Service: picaticAPI', function () {

  // load the service's module
  beforeEach(module('picaticFrontendApp'));

  // instantiate service
  var picaticAPI;
  beforeEach(inject(function (_picaticAPI_) {
    picaticAPI = _picaticAPI_;
  }));

  it('should do something', function () {
    expect(!!picaticAPI).toBe(true);
  });

});
