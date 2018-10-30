const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const port = process.env.PORT || 5000

app.listen(port, ()=> {
    console.log('listening on port', port)
})
