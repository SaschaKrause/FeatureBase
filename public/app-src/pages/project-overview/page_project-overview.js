angular.module('myApp').controller('ProjectOverviewPage', function ($scope, $state, $stateParams, $q) {
  'use strict';

  $scope.page = {
    // all input bound models
    inputs: {
      name: {
        male: null,
        female: null
      }
    },


    names: {
      male: ['Moritz'],
      female: ['Hannah', 'Klara', 'Karolin']
    }
  };


  $scope.addFemaleName = function(name) {
    $scope.page.names.female.push($scope.page.inputs.name.male);
  }

});
