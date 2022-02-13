
/*配置路由守卫，对部分请求进行鉴权 */
module.exports = options =>{
    return async function adminauth(ctx,next){
        /*判断服务器下面的session下面是否有openId,如果有就说明已经登录了,就可以继续下面拿到操作了*/
        if(ctx.session.openId){
            //进行下一步，只有当登录状态的情况下才走我们下一个接口
            await next()
        }else{
            ctx.body={data:'没有登录'}
        }
    }
}



// module.exports = options => {
//     // 返回一个异步的函数，里面有两个参数，时系统自动传过去的
//     return async function adminauth(ctx, next) { // 上下文和下一步执行用的
//         // 登录那里储存了sessionid的，这里打印出来一下
//         console.log(ctx.session.openId); // 这个session共享了，在config.default.js中
//         if (ctx.session.openId) {
//             // 有就说明登录了
//             // 就往下执行，这个文件是一个中间件，这里守卫成功的话就往下个接口走
//             await next();
//         } else {
//             ctx.body = { data: '没有登录' };
//         }
//     };
// };
