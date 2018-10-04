const express = require('express')
const apiRouter  = require('./api')
const path = require('path')
const app = express()
//const morgan = require(morgan)

//Public Static
app.use(express.static(path.join(__dirname, '..', 'public')))

//MiddleWare
app.use(require('body-parser').json())
app.use(require('morgan')('combined'))

//API Router
app.use('/api', apiRouter)

//Primary Route
app.get('/', (req, res, next)=>{
    res.sendFile(path.join(__dirname, '../public/index.html'))
}) 

module.exports = app
//Initialize