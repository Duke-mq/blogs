
'use strict';
const Controller = require('egg').Controller
class MainController extends Controller{
    async index(){
        //首页的文章列表数据
        this.ctx.body='hi api'
    }
    async checkLogin(){
        let username = this.ctx.request.body.username
        let password = this.ctx.request.body.password
        const sql = " SELECT userName FROM admin_user WHERE username = '"+username +
            "' AND password = '"+password+"'"
        const res = await this.app.mysql.query(sql)
        //打印返回的结果
        if(res.length>0){
        /* 登录成功,进行session缓存，把事件戳赋值给openid，并在服务器上面的session缓存openid对象，
            把openid对象传给前端，前端有openid对象，后端session有暂存openid对象，下次验证不用走数据库查询，节省资源*/
            let openId=new Date().getTime()
            this.ctx.session.openId={ 'openId':openId }
            this.ctx.body={'data':'登录成功','openId':openId}
        }else{
            this.ctx.body={data:'登录失败'}
        }
    }
    async getTypeInfo() {
        const resType = await this.app.mysql.select('type')
        this.ctx.body = {data:resType}
    }
    //添加文章
    async addArticle(){
        let tmpArticle= this.ctx.request.body
        console.log(tmpArticle)
        /*mysql 插入数据Api,tmpArticle是一个对象*/
        const result = await this.app.mysql.insert('article',tmpArticle)
        console.log('打印下插入数据库的result',result)
        const insertSuccess = result.affectedRows === 1
        /*为什么要返回一个插入Id，因为我们可能发布文章后要修改*/
        const insertId = result.insertId
        this.ctx.body={
            isScuccess:insertSuccess,
            insertId:insertId
        }
    }
    //修改文章
    async updateArticle(){
        let tmpArticle= this.ctx.request.body
        console.log('打印下',tmpArticle)
        const result = await this.app.mysql.update('article', tmpArticle);
        console.log('打印下结果',result)
        const updateSuccess = result.affectedRows === 1;
        console.log(updateSuccess)
        this.ctx.body={
            isScuccess:updateSuccess
        }
    }
}


module.exports = MainController