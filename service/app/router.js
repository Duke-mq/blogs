/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    //引入模块，调用该方法需要传入一个app进去
    require('./router/default')(app)
    require('./router/admin')(app)
};
