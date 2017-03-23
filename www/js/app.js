'use strict';

require('angular');
require('ionic');
require('angular-material');
require('./modules/playlists/playlists');
require('./modules/login/login');
require('./modules/menu/menu');
require('./modules/users/users');
require('./modules/driverList/driver-list');
require('./modules/addressAutoComplete/address-auto-complete');
require('./modules/searchPath/searchPathComponent');
module.exports = angular.module('starter', [
    'ionic',
    'menu',
    'login',
    'playlists',
    'users',
    'driver-list',
    'address-autocomplete',
    'searchPath'
  ])
    .service('uriservice', require('./uri-service'))
  .config(require('./router'))
  .run(require('./app-main'))
;
