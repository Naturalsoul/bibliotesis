const bcrypt        = require("bcrypt-nodejs")
const Users         = require("../models/users.model")
const StudyGroup    = require("../models/studyGroup.model")
const nodemailer    = require("nodemailer")

module.exports = {
    /*signup: function (user, next) {
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
                        status: false
                    })
                    
                    nUser.save()
                    
                    next({registered: true}) 
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
    },*/
    
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
    },
    
    getUsers: function (next) {
        Users.find({}, function(err, data) {
            if (err) throw err
            
            if (data != null) next(data)
            else next([])
        })
    },
    
    getUserInfo: function (email, next) {
        Users.findOne({email}, function (err, data) {
            if (err) throw err
            
            if (data != null) next(data)
            else next([])
        })
    },
    
    changeAccountType: function (email, accountType, next) {
        Users.update({email}, {
            $set: {
                student: accountType
            }
        }, function (err, data) {
            if (err) throw err
            
            if (data != null) next({updated: true})
            else next({updated: false})
        })
    },
    
    createAccount: function (account, next) {
        Users.count({email: account.email}, function (err, c) {
            if (err) throw err
            
            if (c > 0) next({registered: false})
            else {
                const salt = bcrypt.genSaltSync(10)
                
                bcrypt.hash(account.password, salt, null, function (err, hash) {
                    if (err) throw err
                    
                    let nAccount = new Users ({
                        name: account.name,
                        email: account.email,
                        password: hash,
                        accountType: account.accountType,
                        tesisGroup: (account.studyGroup) ? account.studyGroup : "",
                        status: true,
                        changePassword: true
                    })
                    
                    nAccount.save()
                    
                    if (typeof account.studyGroup != "undefined" && account.studyGroup != "") {
                        StudyGroup.count({name: account.studyGroup}, function (err, c) {
                            if (err) throw err
                            
                            if (c > 0) {
                                StudyGroup.update({name: account.studyGroup}, {
                                    $push: {
                                        students: {
                                            name: account.name,
                                            email: account.email
                                        }
                                    }
                                }, function (err, data) {
                                    if (err) throw err
                                    
                                    if (data != null) next({registered: true})
                                    else next({registered: false})
                                })
                            } else {
                                let nStudyGroup = new StudyGroup ({
                                    name: account.studyGroup,
                                    students: [{
                                        name: account.name,
                                        email: account.email
                                    }]
                                })
                                
                                nStudyGroup.save()
                                
                                next({registered: true})
                            }
                        })
                        
                    } else next({registered: true})
                })
            }
        })
    },
    
    removeUser: function (email, next) {
        Users.remove({email}, function (err, data) {
            if (err) throw err
            
            if (data != null) next({removed: true})
            else next({removed: false})
        })
    },
    
    addNewStudent: function (student, next) {
        Users.count({email: student.email}, function (err, c) {
            if (err) throw err
            
            if (c > 0) {
                next({registered: false})
            } else {
                const salt = bcrypt.genSaltSync(10)
                
                bcrypt.hash(student.password, salt, null, function (err, hash) {
                    if (err) throw err
                    
                    let nUser = new Users ({
                        name: student.name,
                        email: student.email,
                        password: hash,
                        tesisGroup: student.studyGroup,
                        status: true,
                        changePassword: true
                    })
                    
                    nUser.save()
                    
                    StudyGroup.count({name: student.studyGroup}, function (err, c) {
                        if (err) throw err
                        
                        if (c > 0) {
                            StudyGroup.update({name: student.studyGroup}, {
                                $push: {
                                    students: {name: student.name, email: student.email}
                                }
                            }, function (err, data) {
                                if (err) throw err
                                
                                if (data != null) {
                                    sendEmail()
                                } else next({registered: false})
                            })
                        } else {
                            let nStudyGroup = StudyGroup ({
                                name: student.studyGroup,
                                students: [{
                                    name: student.name,
                                    email: student.email
                                }]
                            })
                            
                            nStudyGroup.save()
                            
                            sendEmail()
                        }
                    })
                    
                    function sendEmail () {
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
                            to: student.email, // list of receivers
                            subject: 'Activa tu cuenta en Bibliotesis', // Subject line
                            generateTextFromHTML: true,
                            html: '<h2>Se ha creado una cuenta para ti en Bibliotesis</h2><br /><p>Ya puedes ingresar a la plataforma de Bibliotesis con las siguientes credenciales:</p><br /><ul><li>Email: ' + student.email + '</li><li>Contraseña: ' + student.password + '</li></ul>' // html body
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
                    }
                })
            }
        })
    },
    
    getAllStudents: function (next) {
        Users.find({student: true}, function (err, data) {
            if (err) throw err
            
            if (data != null) {
                next(data)
            } else {
                next([])
            }
        })
    }
}