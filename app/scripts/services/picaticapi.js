'use strict';

/**
 * @ngdoc service
 * @name picaticFrontendApp.picaticAPI
 * @description
 * # picaticAPI
 * Service in the picaticFrontendApp.
 */
angular.module('picaticFrontendApp')
  .factory('PicaticAPI', ['$http', 'apiToken', '$cacheFactory', function ($http, apiToken, $cacheFactory) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    let urlBase = 'https://api.picatic.com/v2';
    let apiFactory = {};
    let _headers = {'Authorization': 'Bearer ' + apiToken};
    let _paging = {limit: 10, offset: 0};
    let cache = $cacheFactory('PicaticCache');
    cache.put('me', {
      "attributes": {
        "access_key": "7a2ce3bcb92d2337fb8f7f483f49bb90ef1c76b3",
        "address_country_id": 38,
        "address_locality": "Vancouver",
        "address_postalcode": "V6B 5C6",
        "address_region_id": 2,
        "address_street": "375 Water St",
        "avatar_uri": "https://s3.amazonaws.com/files.picatic.com/users/575569/f9f9db1a-c858-4415-86ff-6125f2bcb5c1",
        "company": "Picatic",
        "contacted": null,
        "created": "2017-04-27T18:53:24Z",
        "deleted": false,
        "deleted_date": null,
        "email": "jon+frontendchallenge@picatic.com",
        "facebook_id": "",
        "first_name": "Front",
        "id": 575569,
        "last_name": "End Challenge",
        "mailchimp_access_token": null,
        "modified": "2017-04-27T15:06:11Z",
        "newsletter": null,
        "payable_to": null,
        "stripe_api_key": null,
        "stripe_publishable_key": null,
        "telephone": "",
        "website": "http://www.picatic.com"
      }, "id": "575569", "relationships": {}, "type": "user"
    })

    // building the form query string,
    // WHY DID YOU GUYS DESIGN YOUR RESTFUL PAGING THISWAY???
    function toQueryString(obj) {

      function flattenObj(x, path) {
        let result = [];

        path = path || [];

        Object.keys(x).forEach(function (key) {
          if (!x.hasOwnProperty(key)) {
            return;
          }

          let newPath = path.slice();
          newPath.push(key);

          let vals = [];
          if (typeof x[key] === 'object') {
            vals = flattenObj(x[key], newPath);
          } else {
            vals.push({path: newPath, val: x[key]});
          }
          vals.forEach(function (obj) {
            return result.push(obj);
          });
        });

        return result;
      } // flattenObj

      // start with  flattening `obj`
      let parts = flattenObj(obj); // [ { path: [ ...parts ], val: ... }, ... ]

      // convert to array notation:
      parts = parts.map(function (varInfo) {
        if (varInfo.path.length === 1) {
          varInfo.path = varInfo.path[0];
        } else {
          let first = varInfo.path[0];
          let rest = varInfo.path.slice(1);
          varInfo.path = first + '[' + rest.join('][') + ']';
        }
        return varInfo;
      }); // parts.map

      // join the parts to a query-string url-component
      let queryString = parts.map(function (varInfo) {
        return varInfo.path + '=' + varInfo.val;
      }).join('&');
      return queryString;
    }

    apiFactory.getEventTicketPrices = function (eventId) {
      // let event = cache.get('me');
      let params = {
        filter: {
          event_id: eventId
        },
        page: _paging
      };

      return $http({
        method: 'GET',
        url: urlBase + '/ticket_price' + '?' + toQueryString(params),
        headers: _headers
      }).then(response => {
        cache.put('events', response.data.data);
        return cache.get('events');
      });
    };


    apiFactory.getEvent = function (eventId) {
      return $http({
        method: 'GET',
        url: urlBase + '/event/' + eventId,
        headers: _headers
      }).then(response => {
        return response;
        // cache.put('events', response.data.data);
        // return cache.get('events');
      });
    };

    apiFactory.findEvents = function () {
      let me = cache.get('me');
      let params = {
        filter: {
          user_id: me.id
        },
        page: _paging
      };

      return $http({
        method: 'GET',
        url: urlBase + '/event' + '?' + toQueryString(params),
        headers: _headers
      }).then(response => {
        cache.put('events', response.data.data);
        return cache.get('events');
      });
    };

    apiFactory.getMe = function () {

      let data = (cache.get('me'));

      // resolve the promise with data
      if (data)
        return Promise.resolve(data);
      else {
        let req = {
          method: 'GET',
          url: urlBase + '/user/me',
          headers: _headers
        };

        return $http(req).then((response)=> {
          cache.put('me', response.data.data);
          return cache.get('me');
        });
      }

    };

    // default
    apiFactory.getMe().then((me)=> {

    });

    return apiFactory;
  }])
;
