angular.module("TesisService", []).factory("TesisService", ["$http", function ($http) {
    return {
        getAllByScore: function (next) {
            $http.get("/api/plataforma/tesis/allByScore")
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        },
        
        showTesisInRepository: function (id, next) {
            $http.post("/api/plataforma/tesis/showInRepository", {id})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        },
        
        removeTesisFromRepository: function (id, next) {
            $http.post("/api/plataforma/tesis/removeFromRepository", {id})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        },
        
        getByFlag: function (next) {
            $http.get("/api/plataforma/tesis/getByFlag")
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        }
    }
}])