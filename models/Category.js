const Sequelize = require('sequelize')
const connection = require('../database/connection')

Category = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    slug: { /**Se uma categoria tem um título "Desenvolvimento Web", o slug dele vai ser "desenvolvimento-web" */
        type: Sequelize.STRING,
        allowNull: false
    } 
})

module.exports = Category