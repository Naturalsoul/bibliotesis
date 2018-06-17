const StudyGroup = require("../models/studyGroup.model")
const Users      = require("../models/users.model")

module.exports = {
    get: function (next) {
        StudyGroup.find({}, function (err, data) {
            if (err) throw err
            
            if (data != null) {
                next(data)
            } else next([])
        })
    },
    
    update: function (studyGroup, next) {
        StudyGroup.update({name: studyGroup.name}, {
            $set: {
                theme: studyGroup.theme,
                students: studyGroup.students
            }
        }, function (err, data) {
            if (err) throw err
            
            if (data != null) {
                studyGroup.students.forEach(function (e, i) {
                    Users.update({email: e.email}, {
                        $set: {
                            tesisGroup: studyGroup.name
                        }
                    }, function (err, data) {
                        if (err) throw err
                        
                        if (data != null) {
                            if (i == studyGroup.students.length) {
                                next({updated: true})
                            }
                        } else {
                            next({updated: false})
                        }
                    })
                })
                next({updated: true})
            } else next({updated: false})
        })
    }
}