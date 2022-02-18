const User = require('../models/User')

module.exports = {
    createUsers: function(req, res){
        res.render('./admin/users/new')
    },
    saveUsers: function(req, res){
        var email = req.body.email
        var password = req.body.password
        res.json({email, password})
    },
    listAllUsers: function(req, res){
        res.send(`Rota para listar os usuário`)
    }
}