angular.module("AlumnosService", []).factory("AlumnosService", ["$http", function ($http) {
    return {
        getStudyGroup: function (next) {
            $http.get("/api/plataforma/alumnos/studygroup")
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        },
        
        getAdvanceList: function (studyGroup, next) {
            $http.post("/api/plataforma/alumnos/advances", {studyGroup})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        },
        
        getTesisInfo: function (studyGroup, next) {
            $http.post("/api/plataforma/tesis/get", {studyGroup})
                .then(function (data) {
                    next(data.data)
                }, function(err) {
                    console.log(err.data)
                    next([])
                })
        }
    }
}])