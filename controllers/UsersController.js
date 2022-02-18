const User = require('../models/User')
const bcrypt = require('bcryptjs')
const req = require('express/lib/request')

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
        res.render('./admin/users/login')
    },
    authenticate: function(req, res){
        var email = req.body.email
        var password = req.body.password

        User.findOne({where: {email: email}}).then((user) => {
            if(user != undefined){
                var correct = bcrypt.compareSync(password, user.password)
                if(correct){
                    req.session.user = {
                        id: user.id,
                        email: user.email
                    }
                    res.redirect('/admin/articles')
                }else{
                    res.redirect('/login/usuario')
                }
            }else{
                res.redirect('/login/usuario')
            }
        })
    },
    logout: function(req, res)  {
        req.session.user = undefined
        res.redirect('/')
    }
}