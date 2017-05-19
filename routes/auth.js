var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var passport = require('passport');
var LocalStartegy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
passport.use('local-login', new LocalStartegy({
        usernameField: 'Email',
        passwordField: 'Password',
        passReqToCallback: true
    },
    function(req, username, password, done) {
        User.findOne({
            'Email': username
        }, function(err, user) {
            if (err) {
                return done(err);
            } else if (!user) {
                console.log('No user found');
            } else if (!user.validPassword(password)) {
                console.log('Wrong Password');
            } else {
                return done(null, user);
            }
        });
    }
));

passport.use('local-signup', new LocalStartegy({
        usernameField: 'Email',
        passwordField: 'Password',
        passReqToCallback: true
    },
    function(req, username, password, done) {
        process.nextTick(function() {
            User.findOne({
                'Email': username
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (user) {
                    console.log('User already Exists');
                } else {
                    var newUser = new User();
                    newUser.FirstName = req.body.FirstName;
                    newUser.LastName = req.body.LastName;
                    newUser.MobileNumber = req.body.MobileNumber;
                    newUser.Email = req.body.Email;
                    newUser.Password = newUser.generateHash(req.body.Password);
                    newUser.save(function(err) {
                        if (err) {
                            res.json(err);
                        } else {
                            return done(null, newUser);
                            console.log('Signup API Called');
                        }

                    });
                }
            });
        });
    }));

router.post('/signup', passport.authenticate('local-signup'), function(req, res) {
    console.log(req.user);
});

router.post('/login', function(req, res, next) {
    console.log('Login api called');
    passport.authenticate('local-login', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log('Invalid User Name');
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            console.log(user);
            res.status(200).json({
                success: true
            });
        });
    })(req, res, next);
});

router.get('/loggedin', function(req, res) {
    console.log('Status ' + req.isAuthenticated());
    res.send(req.isAuthenticated() ? req.user : '0');
});


router.get('/logout', function(req, res) {
      console.log('Logout api called');
      
    req.logout();
    res.status(200).json({
        status: 'loggedout'
    });
});



module.exports = router;
