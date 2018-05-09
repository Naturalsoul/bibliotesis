angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
    
        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        
        .when("/login", {
            templateUrl: "views/login.html",
            controller: "AuthController"
        })
        
        .when("/login/verification/:email/:hash", {
            templateUrl: "views/emailverification.html",
            controller: "EmailVerificationController"
        })
        
        .when("/plataforma", {
            templateUrl: "views/plataforma.html",
            controller: "MainController"
        })
        
        .when("/plataforma/cuenta", {
            templateUrl: "views/cuenta.html",
            controller: "AccountController"
        })
        
        .when("/plataforma/docentes", {
            templateUrl: "views/docentes.html",
            controller: "DocentesController"
        })
        
        .otherwise({
            redirectTo: "/"
        })
    
    $locationProvider.html5Mode(true);

}]);