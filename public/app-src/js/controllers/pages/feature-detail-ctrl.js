angular.module('myApp').controller('FeatureDetailCtrl', function ($scope, FeatureService, $state, $stateParams, $q) {
  'use strict';

  $scope.page = {
    overview: {
      releases: null
    },
    detailed: {
      release: null,
      releaseFiltered: null,
      countree: null,
      countResult: null,
    }
  };


  var USAGE_FILTER = {
  	REMOVE_ORIGINS: ['localhost', '0.0.0.0']
  };

  $scope.$watch('stateParams', function() {
    if($stateParams.featureId) {

      loadDetailedFeature($stateParams.featureId)
          .then(getFilteredUsageByDays)
          .then(drawChart);
    }
  });



  $scope.getUAInfo = function(UA) {
    return new UAParser().setUA(UA).getResult();
  };
 

  function loadDetailedFeature(releaseId) {
    var deferred = $q.defer();

    FeatureService.getFeatureFromId(releaseId, function onSuccess(releaseData) {
      $scope.page.detailed.release = releaseData;
      $scope.page.detailed.releaseFiltered = _.clone(releaseData, true);
      $scope.filterUsagesByOrigin({remove: USAGE_FILTER.REMOVE_ORIGINS});
      
      deferred.resolve($scope.page.detailed.release);
    });
    
    return deferred.promise;
  }

  function getFilteredUsageByDays() {
  	debugger
  	$scope.page.detailed.dateData = _.groupBy($scope.page.detailed.releaseFiltered.usages, function(item) {
      return moment(item.created_at).format('YYYYMMDD');
    });
  	console.log($scope.page.detailed.dateData);
    return $scope.page.detailed.dateData;
  }

  /**
  * @param remove: Array of strings that are not allowed to be contained in origin
  * @param only: only show usages from this origin
  */
  $scope.filterUsagesByOrigin = function(options) {
  	$scope.page.detailed.releaseFiltered.usages = _.filter($scope.page.detailed.release.usages, function(item) {
  		// remove usages from if needed
  		if(options && _.isArray(options.remove)) {
  			return !_.find(options.remove, function(originToRemove) {
  				return _.contains(item.origin, originToRemove);
  			});
  		}
  		else {
  			return true
  		}
  		
  	});
  };










 function drawChart() {


   // Load the fonts
Highcharts.createElement('link', {
   href: 'http://fonts.googleapis.com/css?family=Roboto+Condensed',
   rel: 'stylesheet',
   type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

Highcharts.theme = {
   colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
      '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
   chart: {
      backgroundColor: {
         linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
         stops: [
            [0, '#282733'],
            [1, '#282733']
         ]
      },
      style: {
         fontFamily: 'Roboto Condensed, sans-serif'
      },
      plotBorderColor: '#606063'
   },
   title: {
      style: {
         color: '#E0E0E3',
         textTransform: 'uppercase',
         fontSize: '26px'
      }
   },
   subtitle: {
      style: {
         color: '#E0E0E3',
         textTransform: 'uppercase'
      }
   },
   xAxis: {
      gridLineColor: '#484655',
      labels: {
         style: {
            color: '#E0E0E3'
         }
      },
      lineColor: '#484655',
      minorGridLineColor: '#505053',
      tickColor: '#484655',
      title: {
         style: {
            color: '#A0A0A3'

         }
      }
   },
   yAxis: {
      gridLineColor: '#484655',
      labels: {
         style: {
            color: '#E0E0E3'
         }
      },
      lineColor: '#484655',
      minorGridLineColor: '#505053',
      tickColor: '#484655',
      tickWidth: 1,
      title: {
         style: {
            color: '#A0A0A3'
         }
      }
   },
   tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
         color: '#F0F0F0'
      }
   },
   plotOptions: {
      series: {
         dataLabels: {
            color: '#B0B0B3'
         },
         marker: {
            lineColor: '#333'
         }
      },
      boxplot: {
         fillColor: '#505053'
      },
      candlestick: {
         lineColor: 'white'
      },
      errorbar: {
         color: 'white'
      }
   },
   legend: {
      itemStyle: {
         color: '#E0E0E3'
      },
      itemHoverStyle: {
         color: '#FFF'
      },
      itemHiddenStyle: {
         color: '#606063'
      }
   },
   credits: {
      style: {
         color: '#666'
      }
   },
   labels: {
      style: {
         color: '#707073'
      }
   },

   drilldown: {
      activeAxisLabelStyle: {
         color: '#F0F0F3'
      },
      activeDataLabelStyle: {
         color: '#F0F0F3'
      }
   },

   navigation: {
      buttonOptions: {
         symbolStroke: '#DDDDDD',
         theme: {
            fill: '#505053'
         }
      }
   },

   // scroll charts
   rangeSelector: {
      buttonTheme: {
         fill: '#505053',
         stroke: '#000000',
         style: {
            color: '#CCC'
         },
         states: {
            hover: {
               fill: '#707073',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            },
            select: {
               fill: '#000003',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            }
         }
      },
      inputBoxBorderColor: '#505053',
      inputStyle: {
         backgroundColor: '#333',
         color: 'silver'
      },
      labelStyle: {
         color: 'silver'
      }
   },

   navigator: {
      handles: {
         backgroundColor: '#666',
         borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(255,255,255,0.1)',
      series: {
         color: '#7798BF',
         lineColor: '#A6C7ED'
      },
      xAxis: {
         gridLineColor: '#505053'
      }
   },

   scrollbar: {
      barBackgroundColor: '#808083',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
   },

   // special colors for some of the
   legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
   background2: '#505053',
   dataLabelsColor: '#B0B0B3',
   textColor: '#C0C0C0',
   contrastTextColor: '#F0F0F3',
   maskColor: 'rgba(255,255,255,0.3)'
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);







   $('#container').highcharts({
            title: {
                text: null,
                x: -20 //center
            },
            chart: {
                type: 'spline',
                // width: 650,
             height: 240
            },
            xAxis: {
                type:'datetime',

             gridLineWidth: 0,
             minorGridLineWidth: 0
            },
            yAxis: {
             labels: {
                  enabled: true
              },
                title: {
                    text: null
                },
                plotLines: [{
                    value: 0,
                    width: 0,
                    color: '#808080'
                }],
                gridLineWidth: 0,
               tickLength: 5,
               tickWidth: 1,
               tickPosition: 'outside',
               lineWidth:1
            },
            tooltip: {
                valueSuffix: '°C'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: 'Tokyo',
                lineWidth: 3,
                data: [
                 [Date.UTC(1970,  9, 27), 0   ],
                  [Date.UTC(1970, 10, 10), 0.6 ],
                  [Date.UTC(1970, 10, 18), 0.7 ],
                  [Date.UTC(1970, 11,  2), 0.8 ],
                  [Date.UTC(1970, 11,  9), 0.6 ],
                  [Date.UTC(1970, 11, 16), 0.6 ],
                  [Date.UTC(1970, 11, 28), 0.67],
                  [Date.UTC(1971,  0,  1), 0.81],
                  [Date.UTC(1971,  0,  8), 0.78],
                  [Date.UTC(1971,  0, 12), 0.98],
                  [Date.UTC(1971,  0, 27), 1.84],
                  [Date.UTC(1971,  1, 10), 1.80],
                  [Date.UTC(1971,  1, 18), 1.80],
                  [Date.UTC(1971,  1, 24), 1.92],
                  [Date.UTC(1971,  2,  4), 2.49],
                  [Date.UTC(1971,  2, 11), 2.79],
                  [Date.UTC(1971,  2, 15), 2.73],
                  [Date.UTC(1971,  2, 25), 2.61],
                  [Date.UTC(1971,  3,  2), 2.76],
                  [Date.UTC(1971,  3,  6), 2.82],
                  [Date.UTC(1971,  3, 13), 2.8 ],
                  [Date.UTC(1971,  4,  3), 2.1 ],
                  [Date.UTC(1971,  4, 26), 1.1 ],
                  [Date.UTC(1971,  5,  9), 0.25],
                  [Date.UTC(1971,  5, 12), 0   ]
                ]
            }]
        });
 }

  

});
