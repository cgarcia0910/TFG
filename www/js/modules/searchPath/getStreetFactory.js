/**
 * Created by carlos on 23/03/17.
 */
function getStreetFactory ($q, $http) {
    var interfaz = {};
    interfaz.getStreet = function (lat, lng) {
        var defered = $q.defer();
        var promise = defered.promise;
        var utmObj = require('utm-latlng');
        var obj = new utmObj();
        $http( {
            method: 'POST',
            url: 'http://localhost:7474/db/data/ext/SpatialPlugin/graphdb/findClosestGeometries',
            data: '{"layer" : "streeMapNodeCorrect2Layer", "pointX" : '+lng+', "pointY" : '+lat+', "distanceInKm" : 0.0001}'
        }).then(function (data) {
                var calles = {};
                var latLng = [];
                angular.forEach(data.data, function (key, value) {
                    angular.forEach(key.data.wkt.substring(12, key.data.wkt.length-1).split(", "), function (key, value) {
                        latLng.push({lng : parseFloat(key.split(" ")[0]), lat: parseFloat(key.split(" ")[1])});
                    });
                    var utmStreet = [];
                    angular.forEach(latLng, function (value, key) {
                        //var utmStreet.push({x: utm.convertLatLngToUtm(value.lat, value.lng).x, y: utm.convertLatLngToUtm(value.lat, value.lng).y});
                        console.log('utm' + obj.convertLatLngToUtm(value.lat, value.lng).Easting);
                        console.log(value);
                    });
                    calles["p"+value] = {color: '#008000', weight: 8, latlngs: latLng};
                    latLng =[];
                });
                console.log(calles);
                defered.resolve(calles);
            },
            function () {

            });
        return promise;
    };
    return interfaz;
}

module.exports = getStreetFactory;