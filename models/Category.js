const Sequelize = require('sequelize')
const connection = require('../database/connection')

const Category = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    slug: { /**Se uma categoria tem um título "Desenvolvimento Web", o slug dele vai ser "desenvolvimento-web" */
        type: Sequelize.STRING,
        allowNull: false
    } 
})

Category.sync({force: false})

module.exports = Category

/**
 * ao invés de escolher uma maneira ou outra de relacionamento,
 * farei um relacionamento de mão dupla.
 * ou seja, criarei os dois relacionamentos ao mesmo tempo.
 * 
 * Artigo --> Categoria
 * 1 artigo pertence a uma categoria
 * 
 * Artigo <-- Categoria
 * 1 categoria possui vários artigos
 */