angular.module("DocentesService", []).factory("DocentesService", ["$http", function ($http) {
    return {
        // Añadir Alumnos ------------------------------------------------------
        
        addNewStudent: function (student, next) {
            $http.post("/api/plataforma/add/student", {student})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next([])
                })
        },
        
        // ---------------------------------------------------------------------
        
        // Grupos de Estudio ---------------------------------------------------
        
        getStudyGroups: function (next) {
            $http.get("/api/plataforma/studygroups")
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next([])
                })
        },
        
        updateStudyGroup: function (studyGroup, next) {
            $http.put("/api/plataforma/studygroup", {studyGroup})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next([])
                })
        },
        
        getStudentList: function (next) {
            $http.get("/api/plataforma/students")
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next([])
                })
        },
        
        // Avances -------------------------------------------------------------
        
        getAdvances: function (studyGroup, next) {
            $http.post("/api/plataforma/advances", {studyGroup})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        },
        
        requestNewAdvance: function (advance, next) {
            $http.post("/api/plataforma/advance", {advance})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        },
        
        approveAdvance: function (advance, next) {
            $http.put("/api/plataforma/advance", {advance})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        },
        
        lookForDifferences: function (actualFile, advance, next) {
            $http.post("/api/plataforma/advance/diffs", {actualFile, advance})
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
        },
        
        requestTesis: function (tesis, next) {
            $http.post("/api/plataforma/tesis", {tesis})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        },
        
        approveTesis: function (tesis, next) {
            $http.post("/api/plataforma/tesis/approve", {tesis})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        }
        
        // ---------------------------------------------------------------------
    }
}])