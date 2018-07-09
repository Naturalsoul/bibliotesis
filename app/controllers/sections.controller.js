const Sections = require("../models/sections.model")
const Users    = require("../models/users.model")

module.exports = {
    save: function (section, next) {
        Sections.count({code: section.code}, function (err, c) {
            if (err) throw err
            
            if (c > 0) {
                next({saved: false, message: "Ya existe una sección con ese código."})
            } else {
                let s = new Sections ({
                    code: section.code,
                    teachersName: section.teacher.name,
                    teachersEmail: section.teacher.email
                })
                
                s.save()
                
                next({saved: true})
            }
        })
    },
    
    getList: function (email, next) {
        Sections.find({teachersEmail: email}, function (err, data) {
            if (err) throw err
            
            if (data != null) {
                let section = data
                
                section = section.map(e => {
                    return new Promise (function (resolve, reject) {
                        Users.count({section: e.code}, function (err, c) {
                            if (err) reject(err)
                            
                            let res = {
                                _id: e._id,
                                id: e.id,
                                code: e.code,
                                teachersName: e.teachersName,
                                teachersEmail: e.teachersEmail,
                                creationDate: e.creationDate,
                                studentsQuantity: c
                            }
                            
                            resolve(res)
                        })
                    })
                })
                
                Promise.all(section).then(function (data) {
                    next(data)
                }, function (err) {
                    console.log(err)
                    next([])
                })
            }
            else next([])
        })
    },
    
    getAll: function (next) {
        Sections.find({}, function (err, data) {
            if (err) throw err
            
            if (data != null) next(data)
            else next([])
        })
    },
    
    remove: function (code, next) {
        Users.updateMany({code}, {
            $set: {
                section: ""
            }
        }, function (err, data) {
            if (err) throw err
            
            if (data != null) {
                Sections.remove({code}, function (err, data) {
                    if (err) throw err
                    
                    if (data != null) {
                        next({removed: true})
                    } else {
                        next({removed: false})
                    }
                })
            } else next({removed: false})
        })
    }
}