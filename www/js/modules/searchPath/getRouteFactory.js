/**
 * Created by carlos on 23/03/17.
 */

function getRouteFactory ($q, $http) {
    var interfaz= {};
    interfaz.getRoute = function () {
        $http( {
            method: 'GET',
            url: 'data/route.json'

        }).then(function (data) {
                console.log(data);
            },
            function () {

            });
    };
    return interfaz;
}

module.exports = getRouteFactory;