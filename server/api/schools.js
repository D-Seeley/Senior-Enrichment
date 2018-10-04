const express = require('express')
const router = express.Router()
const { School } = require('../db').models

router.get('/', (req, res, next)=> {
    console.log('Schools API CALLED******')
    School.findAll({ order: [['id', 'ASC']]})
        .then(schools => res.send(schools))
})

router.post('/', (req, res, next)=> {
    console.log('Create Sschool API CALLED******')
    console.log('Body of POST request', req.body)
    School.create(req.body)
        .then(school => res.send(school))
})

router.get('/:id', (req, res, next)=> {
    console.log('School ID API CALLED******')
    School.findById(req.params.id)
        .then(student => res.send(student))
})

router.delete('/:id', (req, res, next)=> {
    console.log('School DELETE ID API CALLED*******')
    School.destroy({where: { id: req.params.id}})
        .then(()=> res.sendStatus(200))
})

module.exports = router