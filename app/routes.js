// Controllers ----------------

let Users       = require("./controllers/users.controller")

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
    
    // For AngularJS routing ------------
    app.get("*", function (req, res) {
        res.sendFile("index.html", {root: __dirname + "/../public/"})
    })
}