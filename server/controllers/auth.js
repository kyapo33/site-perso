const express = require('express')
const controller = express.Router()
const jwt = require("jsonwebtoken");
const expressJwt = require('express-jwt');
const nodeMailer = require('nodemailer');
require("dotenv").config();

const User = require('../models/user')

controller.userById = async (req, res, next, id) => {
    try {
        const user = await User.findById(id).exec()
        if(!user) {
            return res.status(400).json({
                error: 'Utilisateur non touvé'
            })   
        }
        req.profile = user;
        next();
    }
    catch (err) {
        return res.status(400).json({
            error: 'Utilisateur non touvé'
        })  
    }
}

controller.signup = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if(user) {
            return res.status("401").json({
                error: "Cet adresse e-mail existe déja"
            });        
        } else {
            const user = new User(req.body)
            await user.save()
            res.json({user});
        }
    }
    catch (err) {
        return console.log(err);
    }
}

controller.signin = async (req, res) => {
    const{email, password} = req.body
    try {
        const user = await User.findOne({email}); 
        if(!user || !user.authenticate(password)) {
            return res.status(400).json({
                error: "Mauvais identifiant ou mot de passe"
            })   
        }
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
        res.cookie('t', token, {expire: new Date() + 9999})
        const {_id, username, role} = user
        return res.json({token, user: {_id, email, username, role}
        });
    }
    catch (err) {
        return console.log(err);
    }   
}

controller.signout = (req, res) => {
    res.clearCookie("t");
    return res.json({ message: "Vous avez été déconnecté"})
}

controller.requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
})

controller.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if(!user) {
        return res.status(403).json({
            error: 'Accès interdit'
        });
    }
    next();
}

controller.isAdmin = (req, res, next) => {
    if(req.profile.role === 0) {
        return res.status(403).json({
            error: 'Accès interdit'
        })
    }
    next();
}

controller.contact = async (req, res) => {
    const {email, name, message} = req.body
    let transporter = nodeMailer.createTransport({
        host: process.env.MAILER_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASS
        }
    });
    let mailOptions = {
        from: process.env.MAILER_USER,
        to: 'kevin.yapo@hotmail.fr',
        subject: 'Contact', 
        html: `<p>De: ${email}</p>
            <p>Nom: ${name}</p>
            <p>Message: ${message}</p>`
        };
    transporter.sendMail(mailOptions,(err) => {
        if (err) { 
            return res.status(500).send({ 
                err: 'L\'envoi de votre message a échoué' 
            }); 
        }
        res.status(200).json('Le message a été envoyé ');
    });
}

module.exports = controller;