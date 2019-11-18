const express = require('express')
const controller = express.Router()
const formidable = require('formidable')
const slugify = require('slugify')
const _ = require('lodash')
const fs = require('fs')

const Project = require('../models/project')

controller.create = async (req, res) => {
    try {
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    error: 'Le chargement de l\'image a échoué'
                })
            }
            const {title, body} = fields

            if (!title || !title.length) {
                return res.status(400).json({
                    error: 'Un titre est requis'
                });
            }
            
            if (!body || body.length < 1) {
                return res.status(400).json({
                    error: 'Le contenu est cours'
                });
            }
            
            let project = new Project()
            project.title = title
            project.body = body
            project.slug = slugify(title).toLowerCase()

            if(files.photo) {
                if(files.photo.size > 10000000) {
                    return res.status(400).json({
                        error: 'La photo est trop grande'
                    })   
                } 
                project.photo.data = fs.readFileSync(files.photo.path)
                project.photo.contentType = files.photo.type 
            }
            const result = await project.save()
            return res.json(result)    
        })
    }
    catch (err) {
        return res.status(400).json({
            error: 'La création du projet a échoué'
        })   
    }      
}

controller.list = async(req, res) => {
    try {
        const data = await Project.find()
            .select('_id title slug body photo')
            .exec(); 
        return res.send(data)        
    }
    catch (err) {
        return res.status(400).json({
            error: 'Aucun projets trouvés'
        })
    }    
}

controller.read = async(req, res) => {
    const slug = req.params.slug.toLowerCase()
    try {
        const data = await Project.findOne({slug})
        .select('_id title body slug photo')
        .exec()
        return res.json(data)
    }  
    catch (err) {
        return res.status(400).json({
            error: 'Aucun projets trouvés'
        })
    }   
}

controller.remove = async(req, res) => {
    const slug = req.params.slug.toLowerCase()
    try {
        await Project.findOneAndRemove({slug}).exec();
        return res.json({ 
            message: "Le project a été supprimé'"
        }); 
    }
    catch (err) {
        return res.status(400).json({
            error: 'La suppression a échoué'
        })
    }  
}

controller.edit = async (req, res) => {
    const slug = req.params.slug.toLowerCase()
    try {
        const oldProject = await Project.findOne({slug}).exec();
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    error: 'Le chargement de l\'image a échoué'
                })
            }
            let oldSlug = oldProject.slug;
            _.merge(oldProject, fields);
            oldProject.slug = oldSlug

            if(files.photo) {
                if(files.photo.size > 10000000) {
                    return res.status(400).json({
                        error: 'La photo est trop grande'
                    })   
                } 
                oldProject.photo.data = fs.readFileSync(files.photo.path)
                oldProject.photo.contentType = files.photo.type 
            }
            const result = await oldProject.save()
            return res.json(result)    
        })
    }
    catch (err) {
        return res.status(400).json({
            error: 'La mise a jour du projet a échoué'
        })   
    }      
}

controller.photo = async(req, res) => {
    const slug = req.params.slug.toLowerCase()
    try {
        const project = await Project.findOne({slug})
        .select('photo')
        .exec();
        res.set('Content-Type', project.photo.contentType)
        return res.send(project.photo.data)
    }
    catch (err) {
        return res.status(400).json({
            error: 'Image indisponible'
        })
    }  
}

module.exports = controller