const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = {
    createUsers: function(req, res){
        res.render('./admin/users/new')
    },
    saveUsers: function(req, res){
        var email = req.body.email
        var password = req.body.password

        User.findOne({where: {email: email}}).then((user) => {
            if(user == undefined){
                var salt = bcrypt.genSaltSync(10)
                var hash = bcrypt.hashSync(password, salt)
                User.create({
                    email: email,
                    password: hash
                }).then(() => {
                    res.redirect('/')
                })
            }else{
                res.json({error: 'O email já existe'})
            }
        })
    },
    listAllUsers: function(req, res){
        User.findAll().then((users) => {
            res.render('./admin/users/index', {users: users})
        })
    },
    loginUsuario: function(req, res){
        console.log(`Cheguei aqui`)
        res.render('./admin/users/login')
    }
}