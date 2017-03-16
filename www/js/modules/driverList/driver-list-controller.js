/**
 * Created by carlos on 13/03/17.
 */

"use strict";
function DriverListController ($scope, $q, driverListFactory) {
    $scope.driversReady = false;
    $scope.driversStatus = [];

    console.log($scope.driversStatus);
    $scope.expandDriver = function (id) {
        for (var i=0; i<$scope.driversStatus.length; i++) {
            $scope.driversStatus[i] = false;
        }
        $scope.driversStatus[id] = true;
    };
    driverListFactory.getDrivers().then(
        function(data) {
            console.log(data.data);
            $scope.drivers = data.data;
            for(var i=0; i<data.data.length; i++) {
                $scope.driversStatus.push(false);
            }
        }
    );
}

module.exports = DriverListController;