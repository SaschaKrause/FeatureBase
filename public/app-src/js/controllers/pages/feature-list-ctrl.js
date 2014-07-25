angular.module('myApp').controller('FeatureListCtrl', function ($scope, FeatureService, $state, $stateParams, $q) {
  'use strict';

  $scope.page = {
    list: {
      features: null
    }
  };

  initList();

  function initList() {
    FeatureService.getProjectInfo(function onSuccess(featureHash) {
      console.log(featureHash);
      $scope.page.list.features = featureHash;
    });
  }

  $scope.showDetailedFeature = function(featureId) {
    $state.go('detail.feature', {featureId: featureId});
  };

  $scope.getProjectStartDate = function() {
    return moment().format("YYYY-MM-DD");
  };

});
