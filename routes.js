const articlesController = require('./controllers/ArticlesController')
const categoriesController = require('./controllers/CategoriesController')

const{Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/listarticles', articlesController.listArticles)
router.get('/createarticles', articlesController.createArticles)

router.get('/listcategories', categoriesController.listCategories)
router.get('/createcategories', categoriesController.createCategories)

module.exports = router