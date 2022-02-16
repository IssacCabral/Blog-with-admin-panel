const Category = require('../models/Category')
const slugify = require('slugify') // Essa biblioteca transforma a String em slug
const Article = require('../models/Article')

module.exports = {
    createCategories: function(req, res){
        res.render('./admin/categories/new')
    },
    saveCategory: function(req, res){
        const title = req.body.title
        if(title != ""){
            Category.create({
                title: title,
                slug: slugify(title, {lower: true})
            }).then(() => {
                res.redirect('/admin/categories')
            })
        }else{
            res.redirect('/admin/categories/new')
        }   
    },
    listAllCategories: function(req, res){
        Category.findAll().then((categories) => {
            res.render('./admin/categories/index', {categories: categories})
        })
    },
    deleteCategory: function(req, res){
        var id = req.body.id
        Category.destroy({
            where: {
                id: id
            }
        }).then(() => {
            res.redirect("/admin/categories")
        })
    },
    selectCategory: function(req, res){
        var id = req.params.id

        Category.findByPk(id).then((category) => {
            res.render('./admin/categories/edit', {category: category})
        })
    },
    updateCategory: function(req, res){
        var id = req.body.id
        var title = req.body.title

        // Category.findByPk(id).then((category) => {
        //     category.title = title
        //     category.slug = slugify(title, {lower: true})
        //     category.save()
        //     res.redirect('/admin/categories')
        // })

        Category.update({title: title, slug: slugify(title, {lower: true}) }, {
            where: {
                id: id
            }
        }).then(() => {
            res.redirect('/admin/categories')
        })
    },
    slug: function(req, res) {
        /**Essa é uma rota para criar uma página de categoria específica.
         * Ou seja, quando eu clicar em uma das categorias que estão listadas
         * na navbar homenavbar, eu vou para uma página que exibe apenas as 
         * postagens daquela categoria.
        */
        var slug = req.params.slug
        /* Hey Sequelize, quando você buscar essa categoria, inclua nessa busca
        todos os artigos que fazem parte dela, eae o sequelize traz isso para nós */
        Category.findOne({
            where: {
                slug: slug
            },
            include: [{model: Article}]
        }).then((category) => {
            Category.findAll().then((categories) => {
                res.render('index', {articles: category.articles, categories: categories})
            })
        }).catch(err => {
            res.redirect('/')
        })
    }
}