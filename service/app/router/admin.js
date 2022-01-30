module.exports = app => {
    const {router,controller} = app
    /* 框架会自动帮我们生成守卫 */
    var adminauth = app.middleware.adminauth()
    router.get('/admin/index',controller.admin.main.index)
    router.post('/admin/checkLogin',controller.admin.main.checkLogin)
    // router.get('/admin/getTypeInfo',adminauth,controller.admin.main.getTypeInfo)
    /*这里都不做路由守卫，后面再补充*/
    router.get('/admin/getTypeInfo',controller.admin.main.getTypeInfo)
    router.post('/admin/addArticle',controller.admin.main.addArticle)
    router.post('/admin/updateArticle',controller.admin.main.updateArticle)
    router.get('/admin/getArticleList',controller.admin.main.getArticleList);// 使用路由守卫
    router.get('/admin/delArticle/:id', controller.admin.main.delArticle);// 使用路由守卫
    router.get('/admin/getArticleById/:id',controller.admin.main.getArticleById);// 使用路由守卫

}