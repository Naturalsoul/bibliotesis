angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
    
        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
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
            templateUrl: "views/home.html",
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
        
        .when("/plataforma/alumnos", {
            templateUrl: "views/alumnos.html",
            controller: "AlumnosController"
        })
        
        .when("/plataforma/tesis", {
            templateUrl: "views/tesis.html",
            controller: "TesisController"
        })
        
        .otherwise({
            redirectTo: "/"
        })
    
    $locationProvider.html5Mode(true);

}]);