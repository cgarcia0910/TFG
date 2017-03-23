/**
 * Created by carlos on 16/03/17.
 */

function searchPathController ($scope, $q, getStreetFactory) {
    $scope.center = {lat:39.712304, lng:-6.549675, zoom:25};
    angular.extend($scope, {
        paths : {}
    });

    $scope.$on('address', function (evt, msg) {
        getRouteFactory.getRoute();
        $scope.paths = {p0: {color: '#008000', weight: 3, latlngs: [{lng : -6.5479618, lat: 39.7083008},{lng : -6.5477598, lat: 39.7076709}]},p1: {color: '#008000', weight: 8, latlngs: [{lng : -6.5480179, lat: 39.7082819},{lng : -6.5481424, lat: 39.7088569},{lng : -6.5482051, lat: 39.709193},{lng : -6.5482251, lat: 39.709303}]},p2: {color: '#008000', weight: 8, latlngs: [{lng : -6.5482108, lat: 39.7082173},{lng : -6.5484949, lat: 39.7090965}]}};
        console.log("Ejecutado por component " + msg.id);
        console.log("En padre" + msg.location.lat);
    });
    $scope.calcRuta = function () {


    };
    $scope.$on('leafletDirectiveMap.mousedown', function (e, args) {
        //console.log("clic en mapa");
        getStreetFactory.getStreet(args.leafletEvent.latlng.lat, args.leafletEvent.latlng.lng).then(function (data) {
            //angular.extend($scope, {path : data});
            var path = data;
            console.log(JSON.stringify(data));
            $scope.paths = data;
        });

    });
}

module.exports = searchPathController;