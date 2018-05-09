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
        }
        
        // ---------------------------------------------------------------------
    }
}])