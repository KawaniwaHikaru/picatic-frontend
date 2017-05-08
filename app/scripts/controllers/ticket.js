'use strict';

/**
 * @ngdoc function
 * @name picaticFrontendApp.controller:TicketCtrl
 * @description
 * # TicketCtrl
 * Controller of the picaticFrontendApp
 */
angular.module('picaticFrontendApp')
  .controller('TicketCtrl', function ($routeParams, $scope, PicaticAPI) {

    PicaticAPI.getEventTicket($routeParams.ticketId).then(ticket=> {

      $scope.ticket = ticket;


    });

    $scope.saveTicket = function () {
      // console.log('save')
      PicaticAPI.saveEventTicket($scope.ticket);
    }

  });
