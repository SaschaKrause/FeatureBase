angular.module('myApp').factory('FeatureService',['$http', 'AbstractRestService', function($http, AbstractRestService) {
	'use strict';
	var service = {
		PATH_PROJECT_BY_ID: '/project/pixformance',
		PATH_FEATURE_BY_ID: '/project/pixformance/feature'
	};
	


	service.getProjectInfo = function(onSuccess, onError) {
		AbstractRestService.get(service.PATH_PROJECT_BY_ID, onSuccess, onError);
	};

	service.getFeatureFromId = function(featureId, onSuccess, onError) {
		AbstractRestService.get(service.PATH_FEATURE_BY_ID+'/'+featureId+'', onSuccess, onError);
	};
	
	return service;
}]);
