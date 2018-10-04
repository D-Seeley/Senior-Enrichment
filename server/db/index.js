const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL, { logging: true})

console.log(process.env.DATABASE_URL)

const School = db.define('school', {
    name: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    }
})

const Student = db.define('student', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gpa: {
        type: Sequelize.FLOAT,
        defaultValue: 0
    }
})

School.hasMany(Student)
Student.belongsTo(School)

const sync = async () => { 
    await db.sync({ force: true }) 
    console.log('SYNC RAN************')
}

const seed = async () => {
    let harvard, dcc, marist, rick, morty, summer, jerry, beth, bird
    
    await Promise.all([
        School.create({
            name: 'Harvard',
            address: '123 Fake St',
            description: 'A very fancy school'  
        }),
        School.create({
            name: 'Marist',
            address: '1155 Rt 9',
            description: 'A modest school'  
        }),
        School.create({
            name: 'DCC',
            address: '9 Pendell Av',
            description: 'A very cheap school'  
        }),
        Student.create({
            firstName: 'Rick',
            lastName: 'Sanchez',
        }),
        Student.create({
            firstName: 'Morty',
            lastName: 'Smith',
            gpa: 3 
        }),
        Student.create({
            firstName: 'Summer',
            lastName: 'Smith',
            gpa: 3.5 
        }),
        Student.create({
            firstName: 'Jerry',
            lastName: 'Smith',
            gpa: 1
        }),
        Student.create({
            firstName: 'Beth',
            lastName: 'Sanchez',
            gpa: 4 
        }),
        Student.create({
            firstName: 'Bird',
            lastName: 'Man',
            gpa: 3.75 
        })
    ])
    .then( arr => { 
        [harvard, marist, dcc, rick, morty, summer, jerry, beth, bird] = arr
    })
    .then(()=> console.log('seed complete**********'))

    await rick.setSchool(harvard)
    await jerry.setSchool(dcc)
    await morty.setSchool(dcc)
    await summer.setSchool(marist)
    await beth.setSchool(harvard)
}

const syncAndSeed = async () => {
    await sync()
    await seed()
}
module.exports = {
    db,
    models: {
        School,
        Student
    },
    sync, 
    seed,
    syncAndSeed
}