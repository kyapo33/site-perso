const express = require('express')
const controller = express.Router()
const formidable = require('formidable')
const slugify = require('slugify')
const _ = require('lodash')
const fs = require('fs')

const Resume = require('../models/resume')

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

            const {title} = fields

            let resume = new Resume()
            resume.title = title
            resume.slug = slugify(title).toLowerCase()

            if(files.photo) {
                if(files.photo.size > 10000000) {
                    return res.status(400).json({
                        error: 'La photo est trop grande'
                    })   
                } 
                resume.photo.data = fs.readFileSync(files.photo.path)
                resume.photo.contentType = files.photo.type 
            }
            const result = await resume.save()
            return res.json(result)    
        })
    }
    catch (err) {
        return res.status(400).json({
            error: 'La création du cv a échoué'
        })   
    }      
}

controller.read = async(req, res) => {
    const slug = req.params.slug.toLowerCase()
    try {
        const data = await Resume.findOne({slug})
        .select('_id title photo')
        .exec()
        return res.json(data)
    }  
    catch (err) {
        return res.status(400).json({
            error: 'Aucun cv trouvés'
        })
    }   
}

controller.list = async(req, res) => {
    try {
        const data = await Resume.find()
        return res.send(data)        
    }
    catch (err) {
        return res.status(400).json({
            error: 'Aucun cv trouvés'
        })
    }    
}

controller.photo = async(req, res) => {
    const slug = req.params.slug.toLowerCase()
    try {
        const resume = await Resume.findOne({slug})
        .select('photo')
        .exec();
        res.set('Content-Type', resume.photo.contentType)
        return res.send(resume.photo.data)
    }
    catch (err) {
        return res.status(400).json({
            error: 'Image indisponible'
        })
    }  
}

controller.edit = async (req, res) => {
    const slug = req.params.slug.toLowerCase()
    try {
        const oldResume = await Resume.findOne({slug}).exec();
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    error: 'Le chargement de l\'image a échoué'
                })
            }
            let oldSlug = oldResume.slug;
            _.merge(oldResume, fields);
            oldResume.slug = oldSlug

            if(files.photo) {
                if(files.photo.size > 10000000) {
                    return res.status(400).json({
                        error: 'La photo est trop grande'
                    })   
                } 
                oldResume.photo.data = fs.readFileSync(files.photo.path)
                oldResume.photo.contentType = files.photo.type 
            }
            const result = await oldResume.save()
            return res.json(result)    
        })
    }
    catch (err) {
        return res.status(400).json({
            error: 'La mise a jour du cv a échoué'
        })   
    }      
}

module.exports = controller