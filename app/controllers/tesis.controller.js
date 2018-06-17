const Tesis = require("../models/tesis.model")

module.exports = {
    get: function (studyGroup, next) {
        Tesis.find({studyGroup}, function (err, data) {
            if (err) throw err
            
            if (data != null) next(data)
            else next([])
        })
    },
    
    getAllByScore: function (next) {
        Tesis.find({score: {$gte: 6}}, function (err, data) {
            if (err) throw err
            
            if (data != null) next(data)
            else next([])
        })
    },
    
    save: function (tesis, next) {
        Tesis.count({studyGroup: tesis.studyGroup}, function (err, c) {
            if (err) throw err
            
            if (c > 0) {
                next({saved: false, message: "Ya existe una tesis para este grupo."})
            } else {
                let nTesis = new Tesis ({
                    studyGroup: tesis.studyGroup,
                    title: tesis.title,
                    description: tesis.description,
                    date: tesis.date
                })
                
                nTesis.save()
                
                next({saved: true})
            }
        })
    },
    
    uploadFile: function (id, tesis, file, next) {
        Tesis.findOne({id}, "date", function (err, data) {
            if (err) throw err
            
            if (data != null) {
                let d = new Date()
                
                if (d < data.date) {
                    let keywords = tesis.keywords.split(",")
                    keywords = keywords.map(e => e.trim())
                    
                    Tesis.update({id}, {
                        $set: {
                            title: tesis.title,
                            abstract: tesis.abstract,
                            keywords: keywords,
                            files: file.tesis[0]
                        }
                    }, function (err, data) {
                        if (err) throw err
                        
                        if (data != null) next({up: true})
                        else next({up: false})
                    })
                } else {
                    next({up: false, message: "Se ha sobrepasado el tiempo límite para subir su tesis."})
                }
            } else next({up: false})
        })
    },
    
    approveTesis: function (tesis, next) {
        Tesis.update({id: tesis.id}, {
            $set: {
                score: tesis.score,
                status: true
            }
        }, function (err, data) {
            if (err) throw err
            
            if (data != null) next({approved: true})
            else next({approved: false})
        })
    },
    
    showTesisInRepository: function (id, next) {
        Tesis.update({id}, {
            $set: {
                showInRepository: true
            }
        }, function (err, data) {
            if (err) throw err
            
            if (data != null) next({approved: true})
            else next({approved: false})
        })
    },
    
    removeFromRepository: function (id, next) {
        Tesis.update({id}, {
            $set: {
                showInRepository: false
            }
        }, function (err, data) {
            if (err) throw err
            
            if (data != null) next({removed: true})
            else next({removed: false})
        })
    },
    
    getAllByFlag: function (next) {
        Tesis.find({showInRepository: true}, function (err, data) {
            if (err) throw err
            
            if (data != null) next(data)
            else next([])
        })
    },
    
    getTesis: function (path, next) {
        let fs = require("fs")
        let pathToFile = __dirname + "/../../" + path
        
        if (fs.existsSync(pathToFile)) {
            let file = fs.createReadStream(pathToFile)
            next(file)
        } else {
            let w = fs.createWriteStream("notFound.txt")
            w.write("Documento corrupto. Contacte con el adminstrador.")
            w.end()
            let r = fs.createReadStream("notFound.txt")
            next(r)
        }
    }
}