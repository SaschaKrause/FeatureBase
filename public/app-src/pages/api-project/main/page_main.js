angular.module('myApp').controller('APIMainPage', function ($scope, $http, $q, APIProjectService) {
  'use strict';  

  /** init
  ----------------------------------------------------------------------------*/
  // $scope.requests = {
  //   host: 'http://localhost:3000',
  //   endpoint: '/api/v0/sign_in',
  //   params: '{"username":"SaschaKrause2", "password":"1234qwer"}'
  // };

  $scope.response = {};


  $scope.settings = {
    request : {
      host: 'https://pixformance-api-live.herokuapp.com'
    }
  };

  $scope.currentRequest = null;


  $scope.dataSet = [
    {
      id: 1,
      ref: 1,
      sets: [
        {
          name: 'Sascha',
          id: 1,
          state: 'public',
          notes: 'a normal user',
          data: {
            username: "SaschaKrause2",
            password: "1234qwer"
          },
          headers: {
            'Auth-Token': "asdfasd"
          },
          expect: {
            roles:[{"name":"member"}],
          }
        },{
          name: 'Pixowner',
          id: 2,
          state: 'private',
          notes: 'a club owner',
          data: {
            username: "pixowner",
            password: "0wnerpw"
          },
          headers: {
            'Auth-Token': "123sa"
          },
          expect: {
            roles:[{"name":"owner"}],
          }
        }
      ]
    }
  ];

  $scope.requests = APIProjectService.requests;

  


  $scope.sequence = [
    {id: 1, dataSetId: 1, requestParams: null},
    {id: 2, dataSetId: 3, requestParams: {memberId: 10}},
  ];



    


  $scope.getRequestById = function(id) {
    return _.find($scope.requests, {id: id});
  };

  $scope.setCurrentRequest = function(id) {
    $scope.currentRequest = $scope.getRequestById(id);
    $scope.currentRequest.request.headers = JSON.stringify($scope.currentRequest.request.headers);
  };


  // $scope.requests.request.params.toString = function(){
  //     return JSON.stringify(this);
  // }

  $scope.loadParamsByIdFromSet = function(requestId, dataSetId) {
    $scope.currentRequest.dataSetId = dataSetId;
    $scope.currentRequest.request.params = JSON.stringify(_.find($scope.dataSet[0].sets, {id: dataSetId}).data);
    $scope.currentRequest.request.headers = JSON.stringify(_.find($scope.dataSet[0].sets, {id: dataSetId}).headers);
  }


  // $scope.membersByClub = {
  //   name: "members by club id",
  //   request: {
  //     endpoint: '/members/index_by_club/?club_id=2',
  //     params: '{"username":"SaschaKrause2", "password":"1234qwer"}',
  //     required: {
  //       params: {
  //         stuff: [RequiredTypes.TEXT]
  //       }
  //     }
  //   },
  //   expect: {
  //     status: 200,
  //     contains: {}
  //   }
  // };

  // $scope.sequence = [
  //   loginRequest,
  //   membersByClub  
  // ]

  /** public
  ----------------------------------------------------------------------------*/

  $scope.go = function(requestId) {

    var deferred = $q.defer();

    $scope.loadParamsByIdFromSet(requestId, $scope.currentRequest.dataSetId || 1);

    if($scope.currentRequest.request.method === APIProjectService.Method.POST) {
      $http.post($scope.settings.request.host + $scope.currentRequest.request.endpoint, $scope.currentRequest.request.params, getConfig(requestId)).success(function(data, status, headers, config) {
        deferred.resolve(data);
        $scope.response.status = status;
        $scope.response.value = data;

      }).error(function(data, status) {
        deferred.reject(data)
        $scope.response.status = status;
        $scope.response.value = data;
      });
    }

    else if($scope.currentRequest.request.method === APIProjectService.Method.GET) {
      $http.get($scope.settings.request.host + $scope.currentRequest.request.endpoint, getConfig(requestId)).success(function(data, status, headers, config) {
        deferred.resolve(data);
        $scope.response.status = status;
        $scope.response.value = data;

      }).error(function(data, status) {
        deferred.reject(data);
        $scope.response.status = status;
        $scope.response.value = data;
      });
    }

    return deferred.promise;
  }


  $scope.nextTick = function(sequenceItem) {
    $scope.setCurrentRequest(sequenceItem.id);
    return $scope.go(sequenceItem.id);
  }

  $scope.runSequence = function() {

    // $scope.nextTick($scope.sequence[0]).then($scope.nextTick($scope.sequence[1]))
    $scope.nextTick($scope.sequence[0]).then(function(bla) {
      debugger
      $scope.nextTick($scope.sequence[1])
    })
  };


  $scope.saveDataSet = function() {

  }


  /** private
  ----------------------------------------------------------------------------*/

  function getConfig(requestId) {
    return {
      headers: JSON.parse($scope.getRequestById(requestId).request.headers)
    }
  }


});
