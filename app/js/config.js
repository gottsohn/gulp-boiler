angular.module("myapp.controllers", ['firebase','ngCookies']);
angular.module("myapp.directives", ['firebase','ngCookies']);
angular.module("myapp.services", ['firebase','ngCookies']);


require("./directives/header.js");

require("./services/authentication.js");
require("./services/authorization.js");
require("./services/settings.js");
require("./services/home.js");
require("./services/refs.js");
require("./services/utils.js");


require("./controllers/home.js");
require("./controllers/settings.js");




