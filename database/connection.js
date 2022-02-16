const Sequelize = require('sequelize')

// Dados provisórios, depois escondê-los!!
const user = 'postgres' 
const password = 'postgres'
const database = 'guiapress_db'

const connection = new Sequelize(database, user, password, {
    host: 'localhost',
    dialect: 'postgres',
    timezone: '-3:00'
})

module.exports = connection