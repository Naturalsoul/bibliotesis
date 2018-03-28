angular.module("AuthService", []).factory("AuthService", ["$http", function ($http) {
    return {
        signUp: function (user, next) {
            $http.post("/api/signup", {user})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        },
        
        login: function (user, next) {
            $http.post("/api/login", {user: user})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        },
        
        isLoggedIn: function (next) {
            $http.get("/api/isloggedin")
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        },
        
        verificateEmail: function (userData, next) {
            $http.post("/api/verificateemail", {userData: userData})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        },
        
        logout: function (next) {
            $http.get("/api/logout")
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        }
    }
}])