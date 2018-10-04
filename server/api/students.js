const express = require('express')
const router = express.Router()
const { Student, School } = require('../db').models

router.get('/', (req, res, next)=> {
    console.log('Students API CALLED******')
    Student.findAll({include: [School]})
        .then(students => res.send(students))
})

router.post('/', (req, res, next)=> {
    console.log('Create Student API CALLED******')
    Student.create(req.body)
        .then(student => {
            Student.find({include: [{model: School}], where: {id: student.dataValues.id}})
                .then(response => response.dataValues)
                .then(student => res.send(student))
            })
})

router.get('/:id', (req, res, next)=> {
    console.log('Student ID API CALLED******')
    Student.findAll({include: [{model: School}], where: {id: req.params.id}})
        .then(student => res.send(student))
})

router.delete('/:id', (req, res, next)=> {
    console.log('Student DELETE ID API CALLED*******')
    Student.destroy({where: { id: req.params.id}})
        .then(()=> res.sendStatus(200))
})

router.put('/:id', (req, res, next)=> {
    console.log('Student PUT API CALLED********')
    const { firstName, lastName, gpa, schoolId } = req.body
    Student.update({ firstName, lastName, gpa, schoolId }, {where: { id: req.params.id}})
        .then(()=> Student.find({include: [{model: School}], where: {id: req.params.id}}))
        .then((response) => {
            res.status(200)
            res.send(response.dataValues)
        })
})

module.exports = router