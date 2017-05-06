'use strict';

/**
 * @ngdoc overview
 * @name picaticFrontendApp
 * @description
 * # picaticFrontendApp
 *
 * Main module of the application.
 */
angular
  .module('picaticFrontendApp', [
    'ngRoute',
    // 'ngAnimate',
    // 'ngAria',
    // 'ngCookies',
    // 'ngMessages',
    // 'ngResource',
    // 'ngSanitize'

    ])
  .value("apiToken", "sk_live_f1090aeab90d8ed651128084abf4684f")
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/event/:eventId', {
        templateUrl: 'views/event.html',
        controller: 'EventCtrl',
        controllerAs: 'event'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
