// Imports
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = 8080
const connection = require('./database/connection')
const router = require('./routes')
const session = require('express-session')

// view engine
app.set('view engine', 'ejs')
app.use(express.static('public'))

// sessions
app.use(session({
    secret: "qualquercoisa", cookie: {maxAge: 300000}
}))

// body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Database
connection
    .authenticate()
    .then(() => {
        console.log(`successful connection`)
    }).catch((error) => {
        console.log(`failed connection`)
    })

// Routes
app.use(router)

app.get('/session', (req, res) => {
    req.session.treinamento = "Formação Node.js"
    req.session.ano = 2019
    req.session.email = "issac@email.com"
    req.session.user = {
        username: "issaccabral",
        email: "email@email.com",
        id: 10
    }
    res.send(`Sessão gerada`)
})

app.get('/leitura', (req, res) => {
    res.json({
        treinamento: req.session.treinamento,
        ano: req.session.ano,
        email: req.session.email,
        user: req.session.user
    })
})

// server
app.listen(PORT, () => {console.log(`Running on port ${PORT}`)})