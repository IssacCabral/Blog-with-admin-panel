const Sequelize = require('sequelize')

// Dados provisórios, Depois escondê-los!!
const user = 'postgres' 
const password = 'postgres'
const database = 'guiapress_db'

const connection = new Sequelize(database, user, password, {
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = connection