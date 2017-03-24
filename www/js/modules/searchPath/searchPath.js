/**
 * Created by carlos on 8/02/17.
 */
/**
 * Created by carlos on 30/11/16.
 */
require('leaflet');
require('angular-leaflet-directive');
angular.module('searchPath', ['leaflet-directive']);
angular.module('searchPath').factory('getRouteFactory', ['$q', '$http', require('./getRouteFactory')]);
angular.module('searchPath').factory('getStreetFactory', ['$q', '$http', require('./getStreetFactory')]);
angular.module('searchPath').directive('searchPathComponent',['$q', 'getRouteFactory', 'getStreetFactory', function ($q, getRouteFactory, getStreetFactory) {
  return {
    restrict: 'E',
    template: '<address-directive current-lat="38.87789" current-lng="-6.97061" identifier="origin"></address-directive>' +
    '<address-directive current-lat="38.87789" current-lng="-6.97061" identifier="destination"></address-directive><br>' +
    '<leaflet width="100%" height="400" markers="markers" paths="paths" center="center" zoom></leaflet>',
    scope: {
      nombre: '@',
      currentLat: '@',
      currentLng: '@',
      searchText: '@',
      address: '='
    },
    controller: require('./search-path-controller')
  };
}]);

