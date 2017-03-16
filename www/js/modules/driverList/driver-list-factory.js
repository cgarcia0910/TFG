/**
 * Created by carlos on 13/03/17.
 */

"use strict";

function DriverListFactory ($q, $http, uriservice) {
    var interfaz = {};
    interfaz.getDrivers = function () {
        var defered = $q.defer();
        var promise = defered.promise;
        $http(
            {
                method : 'GET',
                url : uriservice.driverList()
            }
        ).then(function (data) {
            console.log(data);
            defered.resolve(data);
        });
        return promise;
    };
    return interfaz;
}

module.exports = DriverListFactory;