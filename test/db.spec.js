const expect = require('chai').expect
const { db, models, sync, seed, syncAndSeed } = require('../server/db')
const { Student, School } = models
// const request = 
const app = require('supertest')(require('../server/app'))


// const getStudents = async ()=> {
//     return await Student.findAll({})
// }

describe('The tests', ()=> {
    it('are running', ()=> {
        expect(true).to.be.ok
    })
})

describe('The db', ()=> {
    beforeEach(()=> syncAndSeed())

    it('has a model named Student', ()=>{
        expect(Student).to.be.ok
    })
    it('has a model named School', ()=> {
        expect(School).to.be.ok
    })
    it('The initial seed sets 3 schools',()=> {
        return School.findAll({ order: [['name', 'ASC']]})
            .then(schools=> {
                expect(schools.length).to.equal(3)
                expect(schools.length).to.eql(3)
                expect(schools[0].dataValues.name).to.eql('DCC')
                expect(schools[0].dataValues.address).to.eql('9 Pendell Av')
                expect(schools[0].dataValues.description).to.eql('A very cheap school')
            })
    })
    it('The initial seed sets 6 students', ()=> {
        return Student.findAll({ order: [['firstName', 'ASC']]})
            .then(students => {
                expect(students.length).to.eql(6)
                expect(students[0].dataValues.firstName).to.eql('Beth')
                expect(students[0].dataValues.lastName).to.eql('Sanchez')
                expect(students[0].dataValues.gpa).to.eql(4)
            })
    })
    it('DCC has three students', ()=> {
        return Student.findAll({
            where: {
                schoolId: 3
              }
        })
        .then(students => {
            expect(students.length).to.eql(2)
        })
    })
})

describe('API Routes', ()=> {
    describe('GET /api/students', ()=>{
        it('returns a JSON object', ()=> {
            app.get('/api/students')
                .expect('Content-Type', /json/)
                .end()
        })
    })

    describe('GET /api/schools', ()=>{
        it('returns a JSON object', ()=> {
            app.get('/api/schools')
                .expect('Content-Type', /json/)
                .end()
        })
    })
    
})




