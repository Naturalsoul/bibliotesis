// Controllers ----------------

const Users       = require("./controllers/users.controller")
const StudyGroup  = require("./controllers/studyGroup.controller")
const Advances    = require("./controllers/advances.controller")

// ----------------------------

module.exports = function (app) {
    
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
    
    // Docente ---------------------------------------------------
    
    app.post("/api/plataforma/add/student", function (req, res) {
        if (typeof req.session.email != "undefined") {
            Users.addNewStudent(req.body.student, function (data) {
                res.json(data)
            })
        } else {
            res.json([])
        }
    })
    
    app.get("/api/plataforma/studygroups", function(req, res) {
        if (typeof req.session.email != "undefined") {
            StudyGroup.get(function (data) {
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
    
    app.get("/api/plataforma/students", function (req, res) {
        if (typeof req.session.email != "undefined") {
            Users.getAllStudents(function (data) {
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
    
    // For AngularJS routing ------------
    app.get("*", function (req, res) {
        res.sendFile("index.html", {root: __dirname + "/../public/"})
    })
}