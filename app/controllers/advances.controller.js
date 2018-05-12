const Advances = require("../models/advances.model")

module.exports = {
    get: function (studyGroup, next) {
        Advances.find({studyGroup}, function (err, data) {
            if (err) throw err
            
            if (data != null) next(data)
            else next([])
        })
    },
    
    save: function (advance, next) {
        Advances.count({title: advance.title}, function (err, c) {
            if (err) throw err
            
            if (c > 0) next({saved: false})
            else {
                let nAdvance = new Advances ({
                    studyGroup: advance.studyGroup,
                    title: advance.title,
                    description: advance.description,
                    tries: advance.tries,
                    status: false
                })
                
                nAdvance.save()
                
                next({saved: true})
            }
        })
    },
    
    updateFiles: function (advance, files, next) {
        Advances.findOne({id: advance.id}, "tries", function (err, data) {
            if (err) throw err
            
            if (data != null) {
                if (data.tries >= 1) {
                    Advances.update({id: advance.id}, {
                        $set: {
                            files: files,
                        },
                        
                        $inc: {
                            tries: -1
                        }
                    }, function (err, data) {
                        if (err) throw err
                        
                        if (data != null) next({updated: true})
                        else next({updated: false})
                    })
                    
                } else {
                    next({updated: false})
                } 
            } else next({updated: false})
        })
    },
    
    closeAdvance: function (advance, next) {
        Advances.update({id: advance.id}, {
            $set: {
                feedback: advance.feedback,
                status: true
            }
        }, function (err, data) {
            if (err) throw err
            
            if (data != null) next({closed: true})
            else next({closed: false})
        })
    }
}