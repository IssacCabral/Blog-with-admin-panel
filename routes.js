const articlesController = require('./controllers/ArticlesController')
const categoriesController = require('./controllers/CategoriesController')
const usersController = require('./controllers/UsersController')
const Article = require('./models/Article')
const Category = require('./models/Category')
const adminAuth = require('./middlewares/adminAuth')

const{Router} = require('express')
const UsersController = require('./controllers/UsersController')
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
router.get('/admin/categories/new', adminAuth, categoriesController.createCategories)
router.get('/admin/categories', adminAuth, categoriesController.listAllCategories)
router.get('/admin/categories/selectcategory/:id', adminAuth, categoriesController.selectCategory)
router.post('/categories/update', adminAuth, categoriesController.updateCategory)
router.post('/categories/save', adminAuth, categoriesController.saveCategory)
router.post('/categories/delete', adminAuth, categoriesController.deleteCategory)
router.get('/category/:slug', categoriesController.slug)

// Articles Routes
router.get('/admin/articles', adminAuth, articlesController.listAllArticles)
router.get('/admin/articles/selectarticle/:id', adminAuth, articlesController.selectArticle)
router.get('/admin/articles/new', adminAuth, articlesController.createArticles)
router.post('/articles/update', articlesController.updateArticle)
router.post('/articles/save', adminAuth, articlesController.saveArticles)
router.post('/articles/delete', adminAuth, articlesController.deleteArticle)
router.get('/:slug', articlesController.slug)
router.get('/articles/page/:num', articlesController.pagination)

// User Routes
router.get('/admin/users', usersController.listAllUsers)
router.get('/admin/users/new', usersController.createUsers)
router.post('/admin/users/save', usersController.saveUsers)
router.get('/login/usuario', usersController.loginUsuario)
router.post('/login/authenticate', usersController.authenticate)
router.get('/login/logout', usersController.logout)

module.exports = router