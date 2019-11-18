const express = require('express')
const morgan = require('morgan')
const bodyParder = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const cors = require('cors')
const expressValidator = require('express-validator');

require('dotenv').config()

const app = express()

app.use(morgan('dev'))
app.use(bodyParder.json())
app.use(cookieParser());
app.use(cors());
app.use(expressValidator());

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true, 
    useFindAndModify: false
}).then(() => console.log('db connect'));

const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume')
const projectRoutes = require('./routes/project')

app.use('/api', authRoutes);
app.use('/api', resumeRoutes);
app.use('/api', projectRoutes);

const port = process.env.PORT || 8080 
app.listen(port, () => {
    console.log('Server is running')
})
