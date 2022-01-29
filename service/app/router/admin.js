module.exports = app => {
    const {router,controller} = app
    /* 框架会自动帮我们生成守卫 */
    var adminauth = app.middleware.adminauth()
    router.get('/admin/index',controller.admin.main.index)
    router.post('/admin/checkLogin',controller.admin.main.checkLogin)
    // router.get('/admin/getTypeInfo',adminauth,controller.admin.main.getTypeInfo)
    router.get('/admin/getTypeInfo',controller.admin.main.getTypeInfo)
}