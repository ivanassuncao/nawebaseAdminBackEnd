const admin = require('./admin')
const supervisor = require('./supervisor')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/setCompany', app.api.company.setCompany)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)
    app.put('/passwordChange/:id',app.api.user.passwordChange)
    app.get('/states',app.api.util.getStates)
    app.get('/citys/:id',app.api.util.getCitys)
    app.put('/blocked/:id',admin(app.api.user.blocked))
    app.put('/unBlocked/:id',admin(app.api.user.unBlocked))

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(admin(app.api.user.get))

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getById))
        .delete(admin(app.api.user.remove))
     
    app.route('/categories')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.category.get))
        .post(admin(app.api.category.save))

    // Cuidado com ordem! Tem que vir antes de /categories/:id
    app.route('/categories/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getTree)

    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getById)
        .put(admin(app.api.category.save))
        .delete(admin(app.api.category.remove))

   

    app.route('/articles')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.article.get))
        .post(admin(app.api.article.save))

    app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getById)
        .put(admin(app.api.article.save))
        .delete(admin(app.api.article.remove))

    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getByCategory)


    // Grupo Item
    app.route('/grupoitems')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.grupoItem.get))
        .post(admin(app.api.grupoItem.save))

    app.route('/grupoitems/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.grupoItem.getTree)

    app.route('/grupoitems/analit')
        .all(app.config.passport.authenticate())
        .get(app.api.grupoItem.getAnalit)    

    app.route('/grupoitems/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.grupoItem.getById)
        .put(admin(app.api.grupoItem.save))
        .delete(admin(app.api.grupoItem.remove))    

    // Companys    

    app.route('/companys')
        .all(app.config.passport.authenticate())
        .get(app.api.company.get)
        .post(admin(app.api.company.save))

    app.route('/companys/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.company.getById)
        .put(admin(app.api.company.save))
        .delete(admin(app.api.company.remove))  

    // Plano de Contas    

       app.route('/planocontas')
       .all(app.config.passport.authenticate())
       .get(app.api.planoconta.get)
       .post(admin(app.api.planoconta.save))

   app.route('/planocontas/:id')
       .all(app.config.passport.authenticate())
       .get(app.api.planoconta.getById)
       .put(admin(app.api.planoconta.save))
       .delete(admin(app.api.planoconta.remove))       

       // Items    

    app.route('/items')
       .all(app.config.passport.authenticate())
       .get(admin(app.api.item.get))
       .post(admin(app.api.item.save))

    app.route('/items/:id')
       .all(app.config.passport.authenticate())
       .get(app.api.item.getById)
       .put(admin(app.api.item.save))
       .delete(admin(app.api.item.remove))      

      // Vendedor 

    app.route('/vendedores')
       .all(app.config.passport.authenticate())
       .get(app.api.vendedor.get)
       .post(admin(app.api.vendedor.save))

    app.route('/vendedores/:id')
       .all(app.config.passport.authenticate())
       .get(app.api.vendedor.getById)
       .put(admin(app.api.vendedor.save))
       .delete(admin(app.api.vendedor.remove)) 

    // Funcionario

    app.route('/funcionarios')
        .all(app.config.passport.authenticate())
        .get(app.api.funcionario.get)
        .post(admin(app.api.funcionario.save))

    app.route('/funcionarios/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.funcionario.getById)
        .put(admin(app.api.funcionario.save))
        .delete(admin(app.api.funcionario.remove))    

      // Cliente 

    app.route('/clientes')
      .all(app.config.passport.authenticate())
      .get(app.api.cliente.get)
      .post(admin(app.api.cliente.save))

   app.route('/clientes/:id')
      .all(app.config.passport.authenticate())
      .get(app.api.cliente.getById)
      .put(admin(app.api.cliente.save))
      .delete(admin(app.api.cliente.remove))    
   
   app.route('/clientes/:id/clientesdependentes') 
    .all(app.config.passport.authenticate())
    .get(app.api.cliente.getByIdDependente)
    .post(admin(app.api.cliente.saveDependente))
    .delete(admin(app.api.cliente.removeDependente))
}