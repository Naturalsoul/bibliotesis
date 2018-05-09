const studyGroup = require("../models/studyGroup.model")

module.exports = {
    get: function (next) {
        studyGroup.find({}, function (err, data) {
            if (err) throw err
            
            if (data != null) {
                next(data)
            } else next([])
        })
    },
    
    update: function (studyGroup, next) {
        studyGroup.update({id: studyGroup.id}, {
            $set: {
                theme: studyGroup.theme,
                students: studyGroup.students
            }
        }, function (err, data) {
            if (err) throw err
            
            
            if (data != null) {
                next({updated: true})
            } else next({updated: false})
        })
    }
}