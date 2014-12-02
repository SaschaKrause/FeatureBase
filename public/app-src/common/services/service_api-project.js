'use strict';

angular.module('myApp').factory('APIProjectService', function ($http, $q) {

  var service = {};
  
  service.Method = {
    POST: 'POST',
    GET: 'GET',
  };


  service.RequiredTypes = {
    TEXT: 'text',
    NUMBER: 'number',
  };

  service.requests = [
    {
      id: 1,
      name: "login",
      request: {
        endpoint: '/api/v0/sign_in',
        method: service.Method.POST,
        required: {
          params: {
            username: [service.RequiredTypes.TEXT],
            password: [service.RequiredTypes.TEXT]
          }
        },
        params: {
        },
        headers: {
        }
      },
      response: {
        expect: {
          status: 200,
          contains: {
            member_id: [service.RequiredTypes.NUMBER],
            auth_token: [service.RequiredTypes.TEXT]
          }
        }
      }
    },
    {
      id: 2,
      name: "workouts",
      request: {
        endpoint: '/api/v0/members/{memberId}/workouts',
        method: service.Method.GET,
        required: {
        },
        params: {
        },
        headers: {
          "Auth-Token": "asdasd"
        }
      },
      response: {
        expect: {
          status: 200,
          contains: {}
        }
      }
    }
  ];




 

  return service;
});
