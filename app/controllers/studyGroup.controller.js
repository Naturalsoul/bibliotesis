const StudyGroup = require("../models/studyGroup.model")
const Users      = require("../models/users.model")
const Advances   = require("../models/advances.model")
const Tesis      = require("../models/tesis.model")

module.exports = {
    get: function (section, next) {
        StudyGroup.find({section}, function (err, data) {
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
    },
    
    remove: function (studyGroup, next) {
        Users.updateMany({tesisGroup: studyGroup}, {
            $set: {
                tesisGroup: ""
            }
        }, function (err, data) {
            if (err) throw err
            
            if (data != null) {
                Tesis.remove({studyGroup}, function (err, data) {
                    if (err) throw err
                    
                    if (data != null) {
                        Advances.remove({studyGroup}, function (err, data) {
                            if (err) throw err
                            
                            if (data != null) {
                                StudyGroup.remove({name: studyGroup}, function (err, data) {
                                    if (err) throw err
                                    
                                    if (data != null) next({removed: true})
                                    else next({removed: false})
                                })
                            } else next({removed: false})
                        })
                    } else next({removed: false})
                })
            } else next({removed: false})
        })
    }
}