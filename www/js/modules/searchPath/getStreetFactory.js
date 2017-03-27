/**
 * Created by carlos on 23/03/17.
 */
function getStreetFactory ($q, $http) {
    var interfaz = {};
    interfaz.getStreet = function (lat, lng) {
        var defered = $q.defer();
        var promise = defered.promise;
        var dtls = require('distance-to-line-segment');
        var utmObj = require('utm-latlng');
        var obj = new utmObj();
        var utmClickPoint = {'x' : obj.convertLatLngToUtm(lat, lng).Easting, 'y': obj.convertLatLngToUtm(lat,lng).Northing};
        console.log(utmClickPoint);
        $http( {
            method: 'POST',
            url: 'http://localhost:7474/db/data/ext/SpatialPlugin/graphdb/findClosestGeometries',
            data: '{"layer" : "streeMapNodeCorrect2Layer", "pointX" : '+lng+', "pointY" : '+lat+', "distanceInKm" : 0.0001}'
        }).then(function (data) {
                var calles = {};
                var streetLatLng = [];
                var minDist = -1;
                var streetSegment = [];
                angular.forEach(data.data, function (key, value) {
                    angular.forEach(key.data.wkt.substring(12, key.data.wkt.length-1).split(", "), function (key, value) {
                        streetLatLng.push({lng : parseFloat(key.split(" ")[0]), lat: parseFloat(key.split(" ")[1])});
                    });
                    var utmSegment = [];
                    var utmPreviousPoint = "";//{'x' : 0, 'y': 0};
                    var geoPreviousPoint = {};
                    angular.forEach(streetLatLng, function (value, key) {
                        //var utmStreet.push({x: utm.convertLatLngToUtm(value.lat, value.lng).x, y: utm.convertLatLngToUtm(value.lat, value.lng).y});
                        if (utmPreviousPoint === "") {
                            utmPreviousPoint = {'x' : parseFloat(obj.convertLatLngToUtm(value.lat,value.lng).Easting), 'y': parseFloat(obj.convertLatLngToUtm(value.lat,value.lng).Northing)};
                            geoPreviousPoint = {lat : value.lat, lng: value.lng};
                        }
                        else {
                            if (minDist == -1 || minDist > dtls.squared(parseFloat(utmPreviousPoint.x), parseFloat(utmPreviousPoint.y), parseFloat(obj.convertLatLngToUtm(value.lat,value.lng).Easting), parseFloat(obj.convertLatLngToUtm(value.lat,value.lng).Northing), parseFloat(utmClickPoint.x), parseFloat(utmClickPoint.y))) {
                                minDist = dtls.squared(parseFloat(utmPreviousPoint.x), parseFloat(utmPreviousPoint.y), parseFloat(obj.convertLatLngToUtm(value.lat,value.lng).Easting), parseFloat(obj.convertLatLngToUtm(value.lat,value.lng).Northing), parseFloat(utmClickPoint.x), parseFloat(utmClickPoint.y));
                                console.log(geoPreviousPoint);
                                streetSegment = [];
                                streetSegment.push(geoPreviousPoint);
                                //console.log({lng: (obj.convertUtmToLatLng(utmPreviousPoint.x).lng), lat: (obj.convertUtmToLatLng(utmPreviousPoint.x).lat)});
                                //streetLatLng.push({lng: parseFloat(obj.convertUtmToLatLng(utmPreviousPoint.x).lng), lat: parseFloat(obj.convertUtmToLatLng(utmPreviousPoint.x).lat)});
                                streetSegment.push({lng : parseFloat(value.lng), lat: parseFloat(value.lat)});
                            }
                            //console.log(dtls.squared(parseFloat(utmPreviousPoint.x), parseFloat(utmPreviousPoint.y), parseFloat(obj.convertLatLngToUtm(value.lat,value.lng).Easting), parseFloat(obj.convertLatLngToUtm(value.lat,value.lng).Northing), parseFloat(utmClickPoint.x), parseFloat(utmClickPoint.y)) );
                            //utmPreviousPoint = {'x' : parseFloat(obj.convertLatLngToUtm(value.lat,value.lng).Easting), 'y': parseFloat(obj.convertLatLngToUtm(value.lat,value.lng).Northing)};
                            utmPreviousPoint = {'x' : parseFloat(obj.convertLatLngToUtm(value.lat,value.lng).Easting), 'y': parseFloat(obj.convertLatLngToUtm(value.lat,value.lng).Northing)};
                            geoPreviousPoint = {lat : value.lat, lng: value.lng};
                        }
                    });

                    calles["p"+value] = {color: '#008000', weight: 8, latlngs: streetSegment};
                    streetLatLng =[];
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