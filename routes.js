const articlesController = require('./controllers/ArticlesController')
const categoriesController = require('./controllers/CategoriesController')
const Article = require('./models/Article')
const Category = require('./models/Category')

const{Router} = require('express')
const router = Router()

// Main Route
router.get('/', (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4
    }).then((articles) => {
        Category.findAll().then((categories) => {
            res.render('index', {articles: articles, categories: categories})
        })
    })
    
})

// Categories Routes
router.get('/admin/categories/new', categoriesController.createCategories)
router.get('/admin/categories', categoriesController.listAllCategories)
router.get('/admin/categories/selectcategory/:id', categoriesController.selectCategory)
router.post('/categories/update', categoriesController.updateCategory)
router.post('/categories/save', categoriesController.saveCategory)
router.post('/categories/delete', categoriesController.deleteCategory)
router.get('/category/:slug', categoriesController.slug)

// Articles Routes
router.get('/admin/articles', articlesController.listAllArticles)
router.get('/admin/articles/selectarticle/:id', articlesController.selectArticle)
router.get('/admin/articles/new', articlesController.createArticles)
router.post('/articles/update', articlesController.updateArticle)
router.post('/articles/save', articlesController.saveArticles)
router.post('/articles/delete', articlesController.deleteArticle)
router.get('/:slug', articlesController.slug)
router.get('/articles/page/:num', articlesController.pagination)


module.exports = router