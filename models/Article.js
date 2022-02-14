const Sequelize = require('sequelize')
const connection = require('../database/connection')
const Category = require('./Category')

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Article.belongsTo(Category) // 1 artigo pertence a uma categoria 1 x 1 --> belongsTo()
Category.hasMany(Article) // 1 categoria possui vários artigos 1 x n --> hasMany()

Article.sync({force: false})

module.exports = Article

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