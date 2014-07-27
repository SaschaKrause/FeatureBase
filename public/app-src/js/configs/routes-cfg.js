
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
			templateUrl: 'layouts/layout_list.html'
		},
		{
			state: 'detail',
			abstarct: true,
			templateUrl: 'partials/layout_feature-detail'
		},

		// releases
		{state: 'list.project-overview',										url: '/project/overview',																	views: {'content': {templateUrl: 'app-build/pages/project-overview/page_project-overview.html',													controller: 'ProjectOverviewPage' } } },

		// {state: 'detail.feature',														url: '/feature/{featureId}',															views: {'content': {templateUrl: 'partials/counter-detail_release',									controller: 'FeatureDetailCtrl' } } },

		{state: 'app.profile',															url: '/profile',																					views: {'content': {templateUrl: 'partials/profile',																controller: 'ProfileCtrl' } } },
		{state: 'list.initialisation-main',									url: '/init',																							views: {'content': {templateUrl: 'partials/init',																		controller: 'ProfileCtrl'} } },
		{state: 'list.feature-detail', url: '/features', views: {'content': {templateUrl: 'app-build/pages/feature-detail/page_feature-detail.html', controller: 'FeatureDetailPage'} } },
	]);
