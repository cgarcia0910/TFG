/**
 * Created by carlos on 21/03/17.
 */

"use strict";
require('angular-aria');
require('angular-animate');
require('angular-material');
function autocompleteController($scope, autocompleteFactory, geocodeFactory) {
    $scope.querySearch = function () {
        return autocompleteFactory.getSuggestions($scope.searchText, $scope.currentLat, $scope.currentLng);
    };
    $scope.selectedItemChange = function (item) {
        var location = geocodeFactory.getLatLng(item);
        location.then(function (data) {
            $scope.$parent.$broadcast('address', {"id" : $scope.identifier, "location" : data.data.results[0].geometry.location});
        });
    };
}

module.exports = autocompleteController;