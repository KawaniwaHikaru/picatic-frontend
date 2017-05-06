'use strict';

/**
 * @ngdoc function
 * @name picaticFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the picaticFrontendApp
 */
angular.module('picaticFrontendApp')
  .controller('MainCtrl', function ($scope, PicaticAPI) {
    $scope.me = null;
    //
    // PicaticAPI.getMe().then((data) => {
    //   console.log(data);
    //   $scope.me = data
    //   $scope.$apply();
    // });

    PicaticAPI.findEvents().then(events => {
      $scope.events = events;
    })


  });
