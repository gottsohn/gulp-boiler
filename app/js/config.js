angular.module("myapp.controllers", ['firebase','ngCookies']);
angular.module("myapp.directives", ['firebase','ngCookies']);
angular.module("myapp.services", ['firebase','ngCookies']);

require("./directives/header.js");
require("./services/home.js");

require("./controllers/home.js");
require("./controllers/settings.js");




