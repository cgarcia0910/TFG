'use strict';

function PlaylistsController($scope) {
  $scope.playlists = [
    { title: 'Reggae2', id: 1 },
    { title: 'Chillout', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
}

module.exports = ['$scope', PlaylistsController];