"use strict";

function autocompleteFactory ($q, $http, uriservice) {
    var interfaz = {};
    interfaz.getSuggestions = function (searchString, currentLat, currentLng) {
        var defered = $q.defer();
        var promise = defered.promise;
        console.log(currentLat+'--'+currentLng);
        $http( {
            method: 'GET',
            url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+searchString+'&types=address&location='+currentLat+','+currentLng+'&radius=4000&strictbounds&key='+uriservice.GoogleAPIKEY()

        }).then(function (data) {
            console.log(data);
            var places = "";
            angular.forEach( data.data.predictions, function (place) {
                console.log(place.description);
                places = places + place.description.split(',')[0] + ", ";
            });
            places = places.split(/, +/g).map( function (state) {
                return {
                    value: state.toLowerCase(),
                    display: state
                };
            });
            console.log(places);
            defered.resolve(places);
        }, function () {
            defered.reject("msg");
            console.log("error");
        });

        return promise;
    };
    return interfaz;
}

module.exports = autocompleteFactory;