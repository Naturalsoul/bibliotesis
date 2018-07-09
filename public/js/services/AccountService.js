angular.module("AccountService", []).factory("AccountService", ["$http", function ($http) {
    return {
        getUsers: function (next) {
            $http.get("/api/plataforma/users")
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        },
        
        getUserInfo: function (next) {
            $http.get("/api/plataforma/accountinfo")
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        },
        
        changeAccountType: function (accountType, next) {
            $http.post("/api/plataforma/accountinfo", {accountType})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        },
        
        createAccount: function (account, next) {
            $http.post("/api/plataforma/account", {account})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        },
        
        removeUser: function (email, next) {
            $http.put("/api/plataforma/user", {email})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        },
        
        changePassword: function (oldPassword, nPassword, next) {
            $http.post("/api/plataforma/user/p", {oldPassword: oldPassword, nPassword: nPassword})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        },
        
        checkForPassword: function (next) {
            $http.get("/api/plataforma/user/p")
                .then(function (data) {
                    next(data.data)
                }, function(err) {
                    console.log(err.data)
                    next([])
                })
        },
        
        getAllSections: function (next) {
            $http.get("/api/plataforma/account/sections")
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        }
    }
}])