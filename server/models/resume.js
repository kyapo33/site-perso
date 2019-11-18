const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            min: 3,
            max: 160,
            required: true
        },

        slug: {
            type: String,
            unique: true,
            index: true
        },
        
        photo: {
            data: Buffer,
            contentType: String
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Resume', resumeSchema);