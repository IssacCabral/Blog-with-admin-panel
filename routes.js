const articlesController = require('./controllers/ArticlesController')
const categoriesController = require('./controllers/CategoriesController')

const{Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/admin/categories/new', categoriesController.createCategories)
router.get('/admin/categories', categoriesController.listAllCategories)
router.get('/admin/categories/selectcategory/:id', categoriesController.selectCategory)
router.post('/categories/update', categoriesController.updateCategory)
router.post('/categories/save', categoriesController.saveCategory)
router.post('/categories/delete', categoriesController.deleteCategory)

router.get('/admin/articles', articlesController.listAllArticles)
router.get('/admin/articles/new', articlesController.createArticles)
router.post('/articles/save', articlesController.saveArticles)
router.post('/articles/delete', articlesController.deleteArticle)


module.exports = router