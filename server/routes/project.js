const express = require('express')
const router = express.Router()

const project = require('../controllers/project')
const auth = require('../controllers/auth') 

router.post('/create/project/:userId', auth.requireSignIn, auth.isAuth, auth.isAdmin, project.create);
router.get('/project', project.list);
router.get('/project/:slug', project.read);
router.delete('/project/:slug/:userId', auth.requireSignIn, auth.isAuth, auth.isAdmin, project.remove);
router.put('/edit/project/:slug/:userId', auth.requireSignIn, auth.isAuth, auth.isAdmin, project.edit);
router.get('/project/photo/:slug', project.photo);

router.param("userId", auth.userById)

module.exports = router