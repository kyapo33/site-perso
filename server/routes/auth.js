const express = require('express')
const router = express.Router()

const auth = require('../controllers/auth') 

const {contactValidator} = require("../validator");

router.post('/signup', auth.signup)
router.post('/signin', auth.signin)
router.get('/signout', auth.signout)
router.post('/contact', contactValidator, auth.contact)

module.exports = router