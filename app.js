const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const port = process.env.PORT || 5000
require('dotenv').config()

//server setup
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


//mongo db config
mongoose.set("debug", true)
mongoose.connect(process.env.MONGODB, {useNewUrlParser: true})
const jobSchema = new mongoose.Schema({
    title: String
})
const Job = mongoose.model("Job", jobSchema)

//job routes

app.get("/api/jobs", (req,res) =>{
    Job.find()
   .then(function(Job) {
     res.json(Job);
   })
   .catch(function(err) {
     res.send(err);
   });
})

app.post("/api/jobs", (req,res) => {
    Job.create(req.body)
    .then(function(newJob) {
      res.status(201).json(newJob);
    })
    .catch(function(err) {
      res.send(err);
    });
})

app.get("/api/jobs/:jobId", (req,res)=> {
    Job.findById(req.params.jobId)
    .then(function(foundJob) {
      res.json(foundJob);
    })
    .catch(function(err) {
      res.send(err);
    });
})
app.put("/api/jobs/:jobId", (req,res)=> {
    Job.findOneAndUpdate({ _id: req.params.JobId }, req.body, {
        new: true
      })
        .then(function(Job) {
          res.json(Job);
        })
        .catch(function(err) {
          res.send(err);
        });
})
app.delete("/api/jobs/:jobId", (req,res) =>{
    Job.remove({ _id: req.params.JobId })
    .then(function() {
      res.json({ message: "deleted" });
    })
    .catch(function(err) {
      res.send(err);
    });
})


app.listen(port, () => {
    console.log('listening on port', port)
})
