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
                    next({updated: false, message: "Se ha agotado la cantidad de intentos que tenía para subir el avance."})
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
    },
    
    getAdvancesByStudyGroup: function (studyGroup, next) {
        Advances.find({studyGroup}, function (err, data) {
            if (err) throw err
            
            if (data != null) next(data)
            else next([])
        })
    },
    
    getFile: function (fileInfo, next) {
        let path = require("path")
        
        let file = path.join(__dirname + "/../../" + fileInfo.path)
        
        next(file)
    },
    
    lookForDifferences: function (actualFile, advance, next) {
        //require("colors")
        let pdfText     = require("pdf-text")
        let fs          = require("fs")
        let path        = require("path")
        let file1       = ""
        let file2       = ""
        
        let pathToFile1 = path.join(__dirname + "/../../" + actualFile.path)
        
        Advances.findOne({id: advance}, "files", function (err, data) {
            if (err) throw err
            
            if (data != null && data.files.docs) {
                let pathToFile2 = path.join(__dirname + "/../../" + data.files.docs[0].path)
                
                let buffer = fs.readFileSync(pathToFile1)
                
                pdfText(buffer, function (err, chunks) {
                    if (err) throw err
                    
                    file1 = chunks.join("")
                    
                    buffer = fs.readFileSync(pathToFile2)
                    
                    pdfText(buffer, function (err, chunks) {
                        if (err) throw err
                        
                        file2 = chunks.join("")
                        
                        next({file1, file2})
                    })
                })
            } else next([])
        })
    }
}