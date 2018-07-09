// Controllers ----------------

const Sections    = require("./controllers/sections.controller")
const Users       = require("./controllers/users.controller")
const StudyGroup  = require("./controllers/studyGroup.controller")
const Advances    = require("./controllers/advances.controller")
const Tesis       = require("./controllers/tesis.controller")

// ----------------------------

// Dependencies ---------------------

const multer      = require("multer")

// ----------------------------------

module.exports = function (app) {
    
    // Multer Config for Files Upload -------------
    
    let storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, './uploads/');
      },
      filename: function (req, file, callback) {
        callback(null, file.originalname);
      }
    });
    
    let upload = multer({ storage : storage }).fields([{
        name: "docs",
        maxCount: 4
    }, {
        name: "tesis",
        maxCount: 1
    }])
    
    // --------------------------------------------
    
    // Auth -------------------------------
    
    app.post("/api/signup", function (req, res) {
        Users.signup(req.body.user, function (data) {
            res.json(data)
        })
    })
    
    app.post("/api/verificateemail", function (req, res) {
        Users.verificateEmail(req.body.userData, function (data) {
            res.json(data)
        })
    })
    
    app.post("/api/login", function (req, res) {
        Users.login(req.body.user.email, req.body.user.password, function (data) {
            if (data.logged) {
                req.session.logged = true
                req.session.email = req.body.user.email
            }
            
            res.json(data)
        })
    })
    
    app.get("/api/isloggedin", function (req, res) {
        Users.isLoggedIn(req.session, function (data) {
            res.json(data)
        })
    })
    
    app.get("/api/logout", function (req, res) {
        delete req.session.logged
        delete req.session.email
        res.json({logged: false})
    })
    
    app.post("/api/forgetpassword", function(req, res) {
        Users.forgetPassword(req.body.email, function (data) {
            res.json(data)
        })
    })
    
    // Account ----------------------------------------------------
    
    app.get("/api/plataforma/users", function (req, res) {
        if (typeof req.session.email != "undefined") {
            Users.getUsers(function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.get("/api/plataforma/accountinfo", function(req, res) {
        if (typeof req.session.email != "undefined") {
            Users.getUserInfo(req.session.email, function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.post("/api/plataforma/accountinfo", function(req, res) {
        if (typeof req.session.email != "undefined") {
            Users.changeAccountType(req.session.email, req.body.accountType, function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.post("/api/plataforma/account", function (req, res) {
        if (typeof req.session.email != "undefined") {
            Users.createAccount(req.body.account, function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.put("/api/plataforma/user", function(req, res) {
        if (typeof req.session.email != "undefined") {
            Users.removeUser(req.body.email, function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.get("/api/plataforma/user/p", function(req, res) {
        if (typeof req.session.logged != "undefined") {
            Users.checkForPassword(req.session.email, function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.post("/api/plataforma/user/p", function(req, res) {
        if (typeof req.session.logged != "undefined") {
            Users.changePassword(req.session.email, req.body.oldPassword, req.body.nPassword, function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.get("/api/plataforma/account/sections", function (req, res) {
        if (typeof req.session.email != "undefined") {
            Sections.getAll(function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    // Docente ---------------------------------------------------
    
    app.get("/api/plataforma/sections/teacher", function (req, res) {
        if (typeof req.session.email != "undefined") {
            Users.getUserInfo(req.session.email, function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.post("/api/plataforma/sections", function (req, res) {
        if (typeof req.session.email != "undefined") {
            Sections.save(req.body.section, function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.get("/api/plataforma/sections", function (req, res) {
        if (typeof req.session.email != "undefined") {
            Sections.getList(req.session.email, function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.put("/api/plataforma/sections/rm", function (req, res) {
        if (typeof req.session.email != "undefined") {
            Sections.remove(req.body.code, function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.post("/api/plataforma/add/student", function (req, res) {
        if (typeof req.session.email != "undefined") {
            Users.addNewStudent(req.body.student, function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.post("/api/plataforma/studygroups", function(req, res) {
        if (typeof req.session.email != "undefined") {
            StudyGroup.get(req.body.section, function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.put("/api/plataforma/studygroup", function (req, res) {
        if (typeof req.session.email != "undefined") {
            StudyGroup.update(req.body.studyGroup, function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.put("/api/plataforma/studygroup/rm", function (req, res) {
        if (typeof req.session.email != "undefined") {
            StudyGroup.remove(req.body.studyGroup, function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.post("/api/plataforma/students", function (req, res) {
        if (typeof req.session.email != "undefined") {
            Users.getAllStudents(req.body.section, function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.post("/api/plataforma/advances", function (req, res) {
        if (typeof req.session.email != "undefined") {
            Advances.get(req.body.studyGroup, function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.post("/api/plataforma/advance", function (req, res) {
        if (typeof req.session.email != "undefined") {
            Advances.save(req.body.advance, function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.put("/api/plataforma/advance", function(req, res) {
        if (typeof req.session.email != "undefined") {
            Advances.closeAdvance(req.body.advance, function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.post("/api/plataforma/tesis/get", function (req, res) {
        if (typeof req.session.email != "undefined") {
            Tesis.get(req.body.studyGroup, function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.post("/api/plataforma/tesis", function (req, res) {
        if (typeof req.session.email != "undefined") {
            Tesis.save(req.body.tesis, function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.post("/api/plataforma/tesis/approve", function(req, res) {
        if (typeof req.session.email != "undefined") {
            Tesis.approveTesis(req.body.tesis, function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.get("/api/plataforma/tesis/allByScore", function(req, res) {
        if (typeof req.session.email != "undefined") {
            Tesis.getAllByScore(function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.post("/api/plataforma/tesis/showInRepository", function (req, res) {
        if (typeof req.session.email != "undefined") {
            Tesis.showTesisInRepository(req.body.id, function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.post("/api/plataforma/tesis/removeFromRepository", function (req, res) {
        if (typeof req.session.email != "undefined") {
            Tesis.removeFromRepository(req.body.id, function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.get("/api/plataforma/tesis/getByFlag", function (req, res) {
        Tesis.getAllByFlag(function (data) {
            res.json(data)
        })
    })
    
    // Alumnos -----------------------------------------------------------------
    
    app.get("/api/plataforma/alumnos/studygroup", function (req, res) {
        if (typeof req.session.email != "undefined") {
            Users.getStudyGroup(req.session.email, function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.post("/api/plataforma/alumnos/advances", function (req, res) {
        if (typeof req.session.email != "undefined") {
            Advances.getAdvancesByStudyGroup(req.body.studyGroup, function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.post("/api/plataforma/alumnos/advances/up", function (req, res) {
        if (typeof req.session.email != "undefined") {
            upload(req, res, function (err) {
                if (err) throw err
                
                Advances.updateFiles(req.body, req.files, function (data) {
                    res.json(data)
                })
            })
        } else {
            res.json([])
        }
    })
    
    app.get("/api/plataforma/alumnos/advances/file", function (req, res) {
        if (typeof req.session.email != "undefined") {
            Advances.getFile(req.query, function (file) {
                res.download(file, function (err) {
                    if (err) throw err
                })
            })
        } else {
            res.json([])
        }
    })
    
    app.post("/api/plataforma/advance/diffs", function (req, res) {
        if (typeof req.session.email != "undefined") {
            Advances.lookForDifferences(req.body.actualFile, req.body.advance, function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.post('/api/plataforma/alumnos/tesis/up', function (req, res) {
        if (typeof req.session.email != "undefined") {
            upload(req, res, function (err) {
                if (err) throw err
                
                Tesis.uploadFile(req.body.id, req.body, req.files, function (data) {
                    res.json(data)
                })
            })
        } else {
            res.json([])
        }
    })
    
    // -------------------------------------------------------------------------------------------
    
    app.post("/plataforma/tesis/file", function (req, res) {
        Tesis.getTesis(req.body.path, function (file) {
            res.setHeader("Content-Disposition", "inline; filename=" + req.body.filename.replace(/\s/g, "_"))
            res.setHeader("Transfer-Encoding", "chunked")
            file.pipe(res)
        })
    })
    
    // For AngularJS routing ------------
    app.get("*", function (req, res) {
        res.sendFile("index.html", {root: __dirname + "/../public/"})
    })
}