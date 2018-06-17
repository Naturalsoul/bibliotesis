angular.module("bibliotesis", [
    "ngRoute",
    "appRoutes",
    "MainCtrl",
    "HomeCtrl",
    "AuthCtrl",
    "EmailVerificationCtrl",
    "AccountCtrl",
    "DocentesCtrl",
    "AlumnosCtrl",
    "TesisCtrl",
    "AuthService",
    "AccountService",
    "DocentesService",
    "AlumnosService",
    "TesisService"
])


.run(["$rootScope", "$location", "AuthService", function ($rootScope, $location, AuthService) {
    $rootScope.$on("$routeChangeStart", function (e) {
        AuthService.isLoggedIn(function (res) {
            if (!res.logged && /(\/plataforma)+(\/)?(\w+)?/.test($location.path())) {
                $location.path("/login")
            }
        })
    })
}])