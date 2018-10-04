const PORT = process.env.PORT || 1337
const app = require('./app')

//Database Connection
const { sync, seed } = require('./db')

const init = async () => {
    await sync()
    await seed()
    app.listen(PORT, ()=>{ console.log(`App is listening on ${PORT}`)})
}

init()