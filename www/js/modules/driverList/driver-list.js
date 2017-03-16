/**
 * Created by carlos on 13/03/17.
 */
angular.module("driver-list", []);
angular.module('driver-list').factory('driverListFactory', require('./driver-list-factory'));
angular.module("driver-list").directive('driverList', ['$q', 'driverListFactory', function ($q, driverListFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/modules/driverList/driverListTemplate.html',
        scope: {
            urlDrivers: '@',
            currentLat: '@',
            currentLng: '@',
            searchText: '@'
        },
        controller: require('./driver-list-controller')
    };
}]);