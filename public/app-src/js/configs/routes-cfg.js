
angular.module('config.routes', []).constant('routesCfg', [

		// layouts
		{
			state: 'app',
			abstarct: true,
			templateUrl: 'partials/layout_app'
		},
		{
			state: 'list',
			abstarct: true,
			templateUrl: 'partials/layout_list'
		},
		{
			state: 'detail',
			abstarct: true,
			templateUrl: 'partials/layout_feature-detail'
		},

		// releases
		{state: 'list.features',														url: '/feature/list',																			views: {'content': {templateUrl: 'partials/list_releases',													controller: 'FeatureListCtrl' } } },

		{state: 'detail.feature',														url: '/feature/{featureId}',															views: {'content': {templateUrl: 'partials/counter-detail_release',									controller: 'FeatureDetailCtrl' } } },

		{state: 'app.profile',															url: '/profile',																					views: {'content': {templateUrl: 'partials/profile',																controller: 'ProfileCtrl' } } },
		{state: 'app.initialisation-main',									url: '/init',																							views: {'content': {templateUrl: 'partials/init',																		controller: 'ProfileCtrl'} } },
	]);
