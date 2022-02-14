const Category = require('../models/Category')
const slugify = require('slugify') // Essa biblioteca transforma a String em slug

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
                res.redirect('/')
            })
        }else{
            res.redirect('/admin/categories/new')
        }   
    },
    listAllCategories: function(req, res){
        Category.findAll().then((categories) => {
            res.render('./admin/categories/index', {categories: categories})
        })
    }
}