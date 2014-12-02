'use strict';

angular.module('myApp').factory('AreaService', function ($http, $q, AbstractRestService) {

  var service = {
  };


  service.areas = [
    {
      id: '0',
      name: 'Fitness',
      description: 'lorem ipsum'
    },
    {
      id: '1',
      name: 'MrsSporty',
      description: 'lorem ipsum'
    },
    {
      id: '2',
      name: 'Rehab',
      description: 'lorem ipsum'
    },
    {
      id: '3',
      name: 'Hotel',
      description: 'lorem ipsum'
    },
    {
      id: '4',
      name: 'End User',
      description: 'lorem ipsum'
    },
    {
      id: '5',
      name: 'Home',
      description: 'lorem ipsum'
    },
    {
      id: '6',
      name: 'Store-Window',
      description: 'lorem ipsum'
    },
    {
      id: '7',
      name: 'Pix Internal',
      description: 'lorem ipsum'
    },
  ];

  service.getAreas = function() {
    var deferred = $q.defer();
      
    deferred.resolve(service.areas);
    
    return deferred.promise;
  };

  service.getAreaById = function(id) {
    var deferred = $q.defer();

    deferred.resolve(_.find(service.areas, {'id':id}));
    
    return deferred.promise;
  };



  return service;
});
