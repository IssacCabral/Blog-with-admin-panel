module.exports =  function adminAuth(req, res, next){
    if(req.session.user != undefined){
        next()
    }else{
        res.redirect('/login/usuario')
    }
}