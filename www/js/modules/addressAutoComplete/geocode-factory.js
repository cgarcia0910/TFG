/**
 * Created by carlos on 21/03/17.
 */

"use strict";

function geocodeFactory ($q, $http, uriservice) {
    var interfaz = {};
    interfaz.getLatLng = function (address) {
        var defered = $q.defer();
        var promise = defered.promise;
        console.log(address);
        $http({
            method: 'GET',
            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address.value + ', 1&key=' + uriservice.GoogleAPIKEY()

        }).then(function (data) {
            console.log(data);
            defered.resolve(data);
        }, function () {
            defered.reject("msg");
            console.log("error");
        });
        return promise;
    };
    return interfaz;
}

module.exports = geocodeFactory;