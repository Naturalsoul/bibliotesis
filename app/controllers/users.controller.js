const bcrypt        = require("bcrypt-nodejs")
const Users         = require("../models/users.model")
const nodemailer    = require("nodemailer")

module.exports = {
    signup: function (user, next) {
        Users.count({email: user.email}, function (err, count) {
            if (err) throw err
            
            if (count > 0) next({registered: false})
            else {
                const salt = bcrypt.genSaltSync(10)
                
                let str = "";
                for ( ; str.length < 36; str += Math.random().toString( 36 ).substr( 2 ) );
                str = str.substr( 0, 36 );
                
                bcrypt.hash(user.password, salt, null, function (err, hash) {
                    if (err) throw err
                    
                    let nUser = new Users ({
                        email: user.email,
                        password: hash,
                        activationString: str,
                        status: false
                    })
                    
                    nUser.save()
                    
                    var smtpTransport = nodemailer.createTransport({
                      host: "smtp.gmail.com",
                      auth: {
                            type: "login",
                            user: "noreplydeveloping@gmail.com",
                            pass: "herbs_321"
                      }
                    });
                    
                    let mailOptions = {
                        from: '"Bibliotesis" <noreplydeveloping@gmail.com>', // sender address
                        to: user.email, // list of receivers
                        subject: 'Activa tu cuenta en Bibliotesis', // Subject line
                        generateTextFromHTML: true,
                        html: '<h2>Activa tu cuenta en Bibliotesis</h2><br />Copia y pega el siguiente enlace en tu buscador de internet:</p><p>https://bibliotesis-naturalsoul.c9users.io/login/verification/' + user.email + "/" + str + '</p>' // html body
                    };
                    
                    smtpTransport.sendMail(mailOptions, function(error, response) {
                      if (error) {
                        console.log(error);
                      } else {
                        console.log(response);
                        next({registered: true})
                      }
                      smtpTransport.close();
                    });  
                })
            }
        })
    },
    
    verificateEmail: function (user, next) {
        Users.findOne({email: user.email}, "activationString", function (err, data) {
            if (err) throw err
            
            if (data != null && data.activationString.length > 0) {
                if (data.activationString == user.hash) {
                    Users.update({email: user.email}, {
                        $set: {
                            activationString: "",
                            status: true
                        }
                    }, function (err, data) {
                        if (err) throw err
                        
                        next({message: "Se ha verificado su correo electrónico. Ya puede ingresar al sistema."})
                    })
                }
            } else {
                next({})
            }
        })
    },
    
    login: function (email, password, next) {
        Users.findOne({email: email}, "password status", function (err, data) {
            if (err) throw err
            
            if (data != null) {
                if (data.status) {
                    bcrypt.compare(password, data.password, function (err, data) {
                        if (err) throw err
                        
                        if (data) next({logged: true})
                        else next({logged: false})
                    })
                } else {
                    next({logged: false})
                }
            } else {
                next({logged: false})
            }
        })
    },
    
    isLoggedIn: function (session, next) {
        if (session.logged) next({logged: true})
        else next({logged: false})
    }
}