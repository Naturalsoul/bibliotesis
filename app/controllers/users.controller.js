const bcrypt        = require("bcrypt-nodejs")
const Users         = require("../models/users.model")
const StudyGroup    = require("../models/studyGroup.model")
const Sections      = require("../models/sections.model")
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
    },*/
    
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
    
    getStudyGroup: function (email, next) {
        Users.findOne({email}, "tesisGroup", function (err, data) {
            if (err) throw err
            
            if (data != null) {
                StudyGroup.findOne({name: data.tesisGroup}, function (err, data) {
                    if (err) throw err
                    
                    if (data != null) next(data)
                    else next([])
                })
            } else next([])
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
                
                let str = "";
                for ( ; str.length < 16; str += Math.random().toString( 16 ).substr( 2 ) );
                str = str.substr( 0, 16 );
                
                bcrypt.hash(str, salt, null, function (err, hash) {
                    if (err) throw err
                    
                    let nAccount = new Users ({
                        name: account.name,
                        email: account.email,
                        password: hash,
                        student: account.accountType,
                        tesisGroup: (account.studyGroup) ? account.studyGroup : "",
                        section: (account.section) ? account.section : "",
                        status: true,
                        changePassword: true
                    })
                    
                    nAccount.save()
                    
                    if (typeof account.studyGroup != "undefined" && account.studyGroup != "") {
                        StudyGroup.count({name: account.studyGroup, section: account.section}, function (err, c) {
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
                                    
                                    if (data != null) sendEmail(str)
                                    else next({registered: false})
                                })
                            } else {
                                let nStudyGroup = new StudyGroup ({
                                    name: account.studyGroup,
                                    students: [{
                                        name: account.name,
                                        email: account.email
                                    }],
                                    section: account.section
                                })
                                
                                nStudyGroup.save()
                                
                                sendEmail()
                            }
                        })
                        
                    } else sendEmail()
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
                        from: '"ClouDoc" <noreplydeveloping@gmail.com>', // sender address
                        to: account.email, // list of receivers
                        subject: 'Se ha creado una cuenta para ti en ClouDoc', // Subject line
                        generateTextFromHTML: true,
                        html: '<h2>Se ha creado una cuenta para ti en ClouDoc</h2><br /><p>Ya puedes ingresar a la plataforma de ClouDoc con las siguientes credenciales:</p><br /><ul><li>Email: ' + account.email + '</li><li>Contraseña: ' + str + '</li></ul>' // html body
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
            }
        })
    },
    
    removeUser: function (email, next) {
        Users.findOne({email}, function (err, data) {
            if (err) throw err
            
            if (data != null) {
                if (data.student) {
                    let studyGroup = data.tesisGroup
                    
                    StudyGroup.count({name: studyGroup}, function (err, c) {
                        if (err) throw err
                        
                        if (c > 0) {
                            StudyGroup.findOne({name: studyGroup}, function (err, data) {
                                if (err) throw err
                                
                                if (data != null) {
                                    let students = data.students
                                    
                                    students = students.filter(e => e.email != email)
                                    
                                    StudyGroup.update({name: studyGroup}, {
                                        $set: {
                                            students: students
                                        }
                                    }, function (err, data) {
                                        if (err) throw err
                                        
                                        if (data != null) removeUserFromDatabase()
                                        else next({removed: false})
                                    })
                                } else next({removed: false})
                            })
                        } else {
                            removeUserFromDatabase()
                        }
                    })
                } else {
                    removeUserFromDatabase()
                }
            } else next({removed: false})
        })
        
        function removeUserFromDatabase () {
            Users.remove({email}, function (err, data) {
                if (err) throw err
                
                if (data != null) next({removed: true})
                else next({removed: false})
            })
        }
    },
    
    addNewStudent: function (student, next) {
        Users.count({email: student.email}, function (err, c) {
            if (err) throw err
            
            if (c > 0) {
                next({registered: false})
            } else {
                const salt = bcrypt.genSaltSync(10)
                
                let str = "";
                for ( ; str.length < 16; str += Math.random().toString( 16 ).substr( 2 ) );
                str = str.substr( 0, 16 );
                
                bcrypt.hash(str, salt, null, function (err, hash) {
                    if (err) throw err
                    
                    let nUser = new Users ({
                        name: student.name,
                        email: student.email,
                        password: hash,
                        section: student.section,
                        tesisGroup: student.studyGroup,
                        status: true,
                        changePassword: true
                    })
                    
                    nUser.save()
                    
                    StudyGroup.count({name: student.studyGroup, section: student.section}, function (err, c) {
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
                            let nStudyGroup = new StudyGroup ({
                                name: student.studyGroup,
                                students: [{
                                    name: student.name,
                                    email: student.email
                                }],
                                section: student.section
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
                            from: '"ClouDoc" <noreplydeveloping@gmail.com>', // sender address
                            to: student.email, // list of receivers
                            subject: 'Activa tu cuenta en ClouDoc', // Subject line
                            generateTextFromHTML: true,
                            html: '<h2>Se ha creado una cuenta para ti en ClouDoc</h2><br /><p>Ya puedes ingresar a la plataforma de ClouDoc con las siguientes credenciales:</p><br /><ul><li>Email: ' + student.email + '</li><li>Contraseña: ' + str + '</li></ul>' // html body
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
    
    getAllStudents: function (section, next) {
        Users.find({student: true, section}, function (err, data) {
            if (err) throw err
            
            if (data != null) {
                next(data)
            } else {
                next([])
            }
        })
    },
    
    checkForPassword: function (email, next) {
        Users.findOne({email: email}, "changePassword", function (err, data) {
            if (err) next({changePassword: false})

            if (data.changePassword) next({changePassword: true})
            else next({changePassword: false})
        })
    },
    
    changePassword: function (email, password, nPassword, next) {
        Users.findOne({email: email}, "password", function (err, data) {
            if (err) next({changed: false})

            if (data != null) {
                bcrypt.compare(password, data.password, function (err, data) {
                    if (err) next({changed: false})

                    if (data) {
                        const salt = bcrypt.genSaltSync(10)

                        bcrypt.hash(nPassword, salt, null, function (err, hash) {
                            if (err) next({changed: false})

                            Users.update({email: email}, {
                                $set: {
                                    password: hash,
                                    changePassword: false
                                }
                            }, function(err, data) {
                                if (err) next({changed: false})

                                if (data != null) next({changed: true})
                                else next({changed: false})
                            })
                        })
                    } else next({changed: false})
                })
            } else next({changed: false})
        })
    }
}