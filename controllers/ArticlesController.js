const Category = require('../models/Category')
const Article = require('../models/Article')
const slugify = require('slugify')

module.exports = { 
    createArticles: function(req, res){
        /**Pesquiso pelas categorias e passo elas ao formulário
         * de criação do artigo*/
        Category.findAll().then((categories) => {
            res.render('./admin/articles/new', {categories: categories})
        })
    },
    saveArticles: function(req, res){
        const title = req.body.title
        const body = req.body.body
        const category = req.body.category

        if(title === "" || body === ""){
            res.redirect('/admin/articles/new')
        }else{
            Article.create({
                title: title,
                slug: slugify(title, {lower: true}),
                body: body,
                categoryId: category
            }).then(() => {
                res.redirect('/admin/articles')
            }).catch(() => {
                res.send(`Deu ruim`)
            })
        }
    },
    listAllArticles: function(req, res){
        Article.findAll({
            include: [{model: Category}]
        }).then((articles) => {
            res.render('./admin/articles/index', {articles: articles})
        })

    },
    deleteArticle: function(req, res){
        const id = req.body.id
        Article.destroy({
            where: {
                id: id
            }
        }).then(() => {
            res.redirect('/admin/articles')
        })
    },
    slug: function(req, res){
        const slug = req.params.slug
        Article.findOne({
            where: {
                slug: slug
            }
        }).then((article) => {
            Category.findAll().then(categories => {
                res.render('./admin/articles/article', {article: article, categories: categories})
            })
            //res.send(article?.title || 'deu ruim')
        })
    },
    selectArticle: function(req, res){
        var id = req.params.id

        Article.findByPk(id, {
            include: [{model: Category}]
        }).then(article => {
            Category.findAll().then(categories => {
                res.render('./admin/articles/edit', {article: article, categories: categories})
            })
        })
    },
    updateArticle: function(req, res){
        var id = req.body.id
        var title = req.body.title
        var body = req.body.body
        var category = req.body.category

        Article.update({
            title: title, 
            slug: slugify(title, {lower: true}),
            body: body,
            categoryId: category
        },{ where: {
            id: id
        }}).then(() => {
            res.redirect('/admin/articles')
        })
    },
    pagination: function(req, res){
        var pageNum = req.params.num
        var offset = 0

        if(isNaN(pageNum) || pageNum == 1){
            offset = 0
        }else{
            offset = (parseInt(pageNum) - 1) * 4
        }

        Article.findAndCountAll({
            limit: 4,
            offset: offset,
            order: [
                ['id', 'DESC']
            ]
        }).then((articles) => {
            var next
            
            if(offset + 4 >= articles.count){
                next = false
            }else{
                next = true
            }
            
            var result = {
                pageNum: parseInt(pageNum),
                articles: articles,
                next: next
            }
            Category.findAll().then((categories) => {
                res.render('./admin/articles/page', {result: result, categories: categories})
            })
        })
    }
}