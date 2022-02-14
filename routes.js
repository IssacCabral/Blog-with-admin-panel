const articlesController = require('./controllers/ArticlesController')
const categoriesController = require('./controllers/CategoriesController')

const{Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/admin/categories/new', categoriesController.createCategories)
router.get('/admin/categories', categoriesController.listAllCategories)
router.post('/categories/save', categoriesController.saveCategory)


module.exports = router