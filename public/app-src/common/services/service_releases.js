'use strict';

angular.module('myApp').factory('ReleaseService', function ($http, $q, AbstractRestService) {

  var service = {
    PATH_RELEASES_OVERVIEW: '/api/v0/releases',
    PATH_RELEASES_DETAIL: '/api/v0/releases/{id}'
  };

  service.getReleasesOverview = function() {
    var deferred = $q.defer();
    
    AbstractRestService.get(
      this.PATH_RELEASES_OVERVIEW, 
      function onSuccess(data) {
        deferred.resolve(data);
      },
      function onError(err) {
        deferred.reject(err);
      });

    return deferred.promise;
  };

  service.getCounterDetailById = function(id) {
    var deferred = $q.defer();
    
    AbstractRestService.get(
      this.PATH_RELEASES_DETAIL, 
      function onSuccess(data) {
        deferred.resolve(data);
      },
      function onError(err) {
        deferred.reject(err);
      },
      {id: id});

    return deferred.promise;
  };

  return service;
});
