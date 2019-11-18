const express = require('express')
const router = express.Router()

const resume = require('../controllers/resume')
const auth = require('../controllers/auth')

router.post('/create/resume/:userId', auth.requireSignIn, auth.isAuth, auth.isAdmin, resume.create);
router.get('/resume', resume.list);
router.get('/resume/photo/:slug', resume.photo);
router.get('/resume/:slug', resume.read);
router.put('/edit/resume/:slug/:userId', auth.requireSignIn, auth.isAuth, auth.isAdmin, resume.edit);

router.param("userId", auth.userById)

module.exports = router
