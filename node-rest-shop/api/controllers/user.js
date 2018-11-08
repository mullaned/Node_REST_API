
const mongoose = require("mongoose");
//import bcrypt
const bcrypt = require('bcrypt');
//import json web token
const jwt = require('jsonwebtoken');

const User = require('../models/user');


exports.user_signup = (req,res,next) => {
    //first check if the email address already exists in the database
    User.find({email: req.body.email}).exec()
    .then(user =>{
        if(user.lenfth >= 1){
           return res.status(409).json({
               message: 'Email exists already'
           }) 
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) =>{
                if(err){
                    return res.status(500).json({
                        error:err
                    });
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'User Created'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error:err
                        });
                    });
                }      
            })
        }
    })  
}


exports.user_login = (req,res,next) =>{
    User.find({email: req.body.email}).exec()
    .then(users => {
        if(users.length < 1) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, users[0].password, (err,result) => {
            if(err) {
                return res.status(401).json({
                    message: 'Auth failed'
                });  
            }
            if(result){
                const token = jwt.sign({
                    email: users[0].email,
                    userId: users[0]._id
                }, 
                process.env.JWT_KEY, 
                {
                    expiresIn: "1h"
                });

                return res.status(200).json({
                    message: 'Auth Successful',
                    token: token
                });
            }
            res.status(401).json({
                message: 'Auth failed'
            });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}

exports.user_delete = (req,res,next) =>{
    User.remove({_id: req.params.userId}).exec()
    .then(result => {
        res.status(200).json({
            message: 'User deleted'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}