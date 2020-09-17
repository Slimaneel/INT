const express = require('express');
const cors = require ('cors');
const mongoose = require ('mongoose');
const multiparty = require('connect-multiparty');
const multipartyMiddleware = multiparty({uploadDir:'./img'});

require('dotenv').config();

const app = express();
const port = process.env.PORT || 1000;

app.use(cors());

app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});

const connection= mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
}) 

const instructionRouter = require ('./routes/exercises');
const skillRouter = require('./routes/skills');
const chapterRouter = require('./routes/chapter');
const gradeRouter = require('./routes/grade');
const programRouter = require('./routes/program');

app.use('/exercises', instructionRouter);
app.use('/skills', skillRouter);
app.use('/chapter', chapterRouter);
app.use('/grade', gradeRouter);
app.use('/program', programRouter);

app.post('/uploads', multipartyMiddleware, (req, res)=>{
    console.log(req.files.upload);
})

app.listen (port, () => {
    console.log (`Server is running on port: ${port}`);
});