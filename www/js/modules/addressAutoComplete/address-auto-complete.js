/**
 * Created by carlos on 21/03/17.
 */

angular.module("address-autocomplete", ['ngMaterial']);
angular.module("address-autocomplete").constant("GOOGLE_SERVICES", {
    "API_KEY": "AIzaSyBLlgXM_UyBb1cK3gSPS62z2KP-_D0UHc0"
});
angular.module("address-autocomplete").factory('autocompleteFactory', ['$q', '$http', 'uriservice', require('./autocomplete-factory')]);

angular.module("address-autocomplete").factory('geocodeFactory', ['$q', '$http', 'uriservice', require('./geocode-factory')]);

angular.module("address-autocomplete").directive('addressDirective',['$q', 'autocompleteFactory', 'geocodeFactory', function ($q, autocompleteFactory, geocodeFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/modules/addressAutoComplete/address-autocompleteTemplate.html',
        scope: {
            currentLat: '@',
            currentLng: '@',
            identifier: '@'
        },
        controller: require('./autocomplete-controller')
    };
}]);


