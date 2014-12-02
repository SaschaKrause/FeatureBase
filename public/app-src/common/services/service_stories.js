'use strict';

angular.module('myApp').factory('StoryService', function ($http, $q, AbstractRestService) {

  var service = {
  };


  service.stories = [{
    id: 0,
    summary: 'Smartphone App to access the ST',
    profit: true,
    categoryId: 0,
    impactAreas: [{
      areaId: 0,
      impactLevel: 5
    },{
      areaId: 1,
      impactLevel: 1
    },{
      areaId: 2,
      impactLevel: 3
    },{
      areaId: 6,
      impactLevel: 2
    }],
    intro_label: 'As a',
    roles: [{name: 'Member'}, {name: 'Owner'}],
    action_label: 'I want to',
    action_value: 'get custom exercises and workouts on a SmartTrainer',
    result_label: 'without',
    result_value: 'the need of having an individual QR code',

    description: 'The Smartphone App will be used to login to your existing account, and select execises/workouts that you want to do on a specific SmartTrainer. You can select from a list of all available SmartTrainer in your club.'
  }, 

  {
    id: 1,
    summary: 'Tanita Scale Connection to Cloud',
    profit: true,
    categoryId: 0,
    impactAreas: [{
      areaId: 0,
      impactLevel: 2
    },{
      areaId: 1,
      impactLevel: 5
    },{
      areaId: 2,
      impactLevel: 1
    }],
    intro_label: 'As a',
    roles: [{name: 'ServiceGuy'}],
    action_label: 'I want to',
    action_value: 'update the station version without checking ActiveDirectory',
    result_label: 'so that',
    result_value: 'I dont need to maintain the dependencies in 2 places',

    description: 'These params consume the remaining arguments passed to a mixin or function. This is useful when utilizing (for example) the implicit (...)'
  }, 

  {
    id: 2,
    summary: 'Access Rights Management',
    profit: false,
    categoryId: 0,
    impactAreas: [{
      areaId: 0,
      impactLevel: 4
    },{
      areaId: 1,
      impactLevel: 5
    },{
      areaId: 2,
      impactLevel: 3
    }],
    intro_label: 'As a',
    roles: [{name: 'Owner'}],
    action_label: 'I want to',
    action_value: 'have access to the results of my members',
    result_label: 'so that',
    result_value: 'I can watch them',

    description: 'These params consume the remaining arguments passed to a mixin or function. This is useful when utilizing (for example) the implicit (...)'
  }, 

  {
    id: 3,
    summary: 'Advertisement on ST',
    profit: false,
    categoryId: 0,
    impactAreas: [{
      areaId: 0,
      impactLevel: 4
    },
    {
      areaId: 1,
      impactLevel: 5
    }],
    intro_label: 'As a',
    roles: [{name: 'Member'}],
    action_label: 'I want to',
    action_value: 'update the station version without checking ActiveDirectory',
    result_label: 'so that',
    result_value: 'I dont need to maintain the dependencies in 2 places',

    description: 'These params consume the remaining arguments passed to a mixin or function. This is useful when utilizing (for example) the implicit (...)'
  }, 

  {
    id: 4,
    summary: 'Advertisement on Platform',
    profit: false,
    categoryId: 1,
    impactAreas: [{
      areaId: 0,
      impactLevel: 4
    },
    {
      areaId: 1,
      impactLevel: 4
    },
    {
      areaId: 2,
      impactLevel: 4
    },
    {
      areaId: 3,
      impactLevel: 4
    },
    {
      areaId: 5,
      impactLevel: 5
    }],
    intro_label: 'As a',
    roles: [{name: 'Member'}],
    action_label: 'I want to',
    action_value: 'update the station version without checking ActiveDirectory',
    result_label: 'so that',
    result_value: 'I dont need to maintain the dependencies in 2 places',

    description: 'These params consume the remaining arguments passed to a mixin or function. This is useful when utilizing (for example) the implicit (...)'
  }, 

  {
    id: 5,
    summary: 'Usage-Statistics Tool for Admins/Clubs',
    profit: true,
    categoryId: 1,
    impactAreas: [{
      areaId: 0,
      impactLevel: 5
    },
    {
      areaId: 1,
      impactLevel: 5
    },
    {
      areaId: 2,
      impactLevel: 5
    },
    {
      areaId: 3,
      impactLevel: 5
    },
    {
      areaId: 7,
      impactLevel: 5
    }],
    intro_label: 'As a',
    roles: [{name: 'Member'}],
    action_label: 'I want to',
    action_value: 'update the station version without checking ActiveDirectory',
    result_label: 'so that',
    result_value: 'I dont need to maintain the dependencies in 2 places',

    description: 'These params consume the remaining arguments passed to a mixin or function. This is useful when utilizing (for example) the implicit (...)'
  },

  {
    id: 6,
    summary: 'Exercise Invariant Ranges can be adjusted by Supervisor',
    profit: false,
    categoryId: 1,
    impactAreas: [{
      areaId: 0,
      impactLevel: 1
    },
    {
      areaId: 2,
      impactLevel: 5
    }
    ],
    intro_label: 'As a',
    roles: [{name: 'Member'}],
    action_label: 'I want to',
    action_value: 'update the station version without checking ActiveDirectory',
    result_label: 'so that',
    result_value: 'I dont need to maintain the dependencies in 2 places',

    description: 'These params consume the remaining arguments passed to a mixin or function. This is useful when utilizing (for example) the implicit (...)'
  },

  {
    id: 7,
    summary: 'Pix-Challenge. Compete against others',
    profit: true,
    categoryId: 1,
    impactAreas: [{
      areaId: 0,
      impactLevel: 5
    },
    {
      areaId: 2,
      impactLevel: 5
    },
    {
      areaId: 3,
      impactLevel: 2
    }
    ],
    intro_label: 'As a',
    roles: [{name: 'Member'}],
    action_label: 'I want to',
    action_value: 'update the station version without checking ActiveDirectory',
    result_label: 'so that',
    result_value: 'I dont need to maintain the dependencies in 2 places',

    description: 'These params consume the remaining arguments passed to a mixin or function. This is useful when utilizing (for example) the implicit (...)'
  },

  {
    id: 8,
    summary: 'Homeworkout with Platform',
    profit: true,
    categoryId: 1,
    impactAreas: [{
      areaId: 0,
      impactLevel: 5
    },
    {
      areaId: 1,
      impactLevel: 3
    },
    {
      areaId: 2,
      impactLevel: 2
    },
    {
      areaId: 5,
      impactLevel: 5
    }
    ],
    intro_label: 'As a',
    roles: [{name: 'Member'}],
    action_label: 'I want to',
    action_value: 'update the station version without checking ActiveDirectory',
    result_label: 'so that',
    result_value: 'I dont need to maintain the dependencies in 2 places',

    description: 'These params consume the remaining arguments passed to a mixin or function. This is useful when utilizing (for example) the implicit (...)'
  },

  {
    id: 9,
    summary: 'Exercise Creator Toolkit',
    profit: false,
    categoryId: 2,
    impactAreas: [{
      areaId: 4,
      impactLevel: 5
    },
    {
      areaId: 7,
      impactLevel: 5
    }
    ],
    intro_label: 'As a',
    roles: [{name: 'Member'}],
    action_label: 'I want to',
    action_value: 'update the station version without checking ActiveDirectory',
    result_label: 'so that',
    result_value: 'I dont need to maintain the dependencies in 2 places',

    description: 'These params consume the remaining arguments passed to a mixin or function. This is useful when utilizing (for example) the implicit (...)'
  },

  {
    id: 10,
    summary: 'Send Email Notifications after Workout',
    profit: false,
    categoryId: 1,
    impactAreas: [{
      areaId: 0,
      impactLevel: 5
    },
    {
      areaId: 1,
      impactLevel: 4
    },
    {
      areaId: 2,
      impactLevel: 2
    }
    ],
    intro_label: 'As a',
    roles: [{name: 'Member'}],
    action_label: 'I want to',
    action_value: 'update the station version without checking ActiveDirectory',
    result_label: 'so that',
    result_value: 'I dont need to maintain the dependencies in 2 places',

    description: 'These params consume the remaining arguments passed to a mixin or function. This is useful when utilizing (for example) the implicit (...)'
  }

  ];

  service.getStories = function() {
    var deferred = $q.defer();
      
    deferred.resolve(service.stories);
    
    return deferred.promise;
  };

  service.getStoryById = function(id) {
    var deferred = $q.defer();

    var storyId = parseInt(id);
    deferred.resolve(_.find(service.stories, {'id':storyId}));
    
    return deferred.promise;
  };



  return service;
});
