// created at: Mon Sep 08 2014 00:29:14 GMT+0200 (CEST)
angular.module('myApp').controller('WatchlistPage', function ($scope, ReleaseService) {
  'use strict';  

  /** init
  ----------------------------------------------------------------------------*/

  $scope.releases= [];




  /** public
  ----------------------------------------------------------------------------*/

  $scope.fn = function () {

  }

  /** private
  ----------------------------------------------------------------------------*/

  init();

  function init() {
    ReleaseService.getReleasesOverview().then(function(data) {
      console.log(data)
      $scope.releases = data;

      calculateAndAddDaysFromNow();
    });
  }


  function calculateAndAddDaysFromNow() {

    // var secondsDifference = Math.abs(moment().diff(moment(releaseItem.date), 'seconds'));
    var daysFromSecondsDivider = (60*60*24);
    // var dayLeftoverInSeconds = secondsDifference % daysFromSecondsDivider;


    _.each($scope.releases, function(releaseItem) {
      releaseItem.daysLeft = parseInt((Math.abs(moment().diff(moment(releaseItem.date), 'seconds'))) / daysFromSecondsDivider);
    });
  }

});
