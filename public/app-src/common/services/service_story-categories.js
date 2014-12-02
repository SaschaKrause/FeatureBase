'use strict';

angular.module('myApp').factory('CategoryService', function ($http, $q, AbstractRestService) {

  var service = {
  };


  service.categories = [
    {
      id: '0',
      name: 'Planned',
      description: 'Features currently in pipline.'
    },
    {
      id: '1',
      name: 'Visions',
      description: 'Features worth investigating'
    },
    {
      id: '2',
      name: 'Internal',
      description: 'Features that help us being faster'
    }
  ];

  service.getCategories = function() {
    var deferred = $q.defer();
      
    deferred.resolve(service.categories);
    
    return deferred.promise;
  };

  service.getCategoryById = function(id) {
    var deferred = $q.defer();

    deferred.resolve(_.find(service.categories, {'id':id}));
    
    return deferred.promise;
  };



  return service;
});
