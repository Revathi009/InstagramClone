const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 3000
const {MONGOURI} = require('./keys')

require('./models/user')

mongoose.connect(MONGOURI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected', ()=> {
    console.log("connected to mongo")
})

mongoose.connection.on('error', (err)=> {
    console.log("error connecting to mongo", err)
})











// const customMiddleware = (req,res,next)=> {
//     console.log("middleware executed!")
//     next()
// }

// // app.use(customMiddleware)


// app.get('/', (req,res)=> {
//     console.log("home")
//     res.send("hello world")
// })

// app.get('/about', customMiddleware, (req,res)=> {
//     console.log("about")
//     res.send("about page")
// })

app.listen(PORT, ()=> {
    console.log("server is running..", PORT);
})