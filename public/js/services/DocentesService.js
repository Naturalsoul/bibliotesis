angular.module("DocentesService", []).factory("DocentesService", ["$http", function ($http) {
    return {
        // Secciones -----------------------------------------------------------
        
        getTeacherInfo: function (next) {
            $http.get("/api/plataforma/sections/teacher")
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        },
        
        addNewSection: function (section, next) {
            $http.post("/api/plataforma/sections", {section})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        },
        
        getSectionsList: function (next) {
            $http.get("/api/plataforma/sections")
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        },
        
        removeSection: function (code, next) {
            $http.put("/api/plataforma/sections/rm", {code})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        },
        
        // ---------------------------------------------------------------------
        
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
        
        getStudyGroups: function (section, next) {
            $http.post("/api/plataforma/studygroups", {section})
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
        
        getStudentList: function (section, next) {
            $http.post("/api/plataforma/students", {section})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next([])
                })
        },
        
        removeStudyGroup: function (studyGroup, next) {
            $http.put("/api/plataforma/studygroup/rm", {studyGroup})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
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