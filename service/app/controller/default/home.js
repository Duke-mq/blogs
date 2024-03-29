const Controller = require('egg').Controller
class HomeController extends Controller{
    async index(){
        this.ctx.body= 'api hi'
    }

    //这个是获取所有文章的接口
    async getArticleList(){
        let sql = 'SELECT article.id as id,'+
            'article.title as title,'+
            'article.introduce as introduce,'+
            "FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime," +
            'article.view_count as view_count ,'+
            'type.typeName as typeName '+
            'FROM article LEFT JOIN type ON article.type_id = type.Id'
        const results = await this.app.mysql.query(sql)
        this.ctx.body={
            data:results
        }
    }

    async getArticleById(){
        //先配置路由的动态传值，然后再接收值,再进行sql查询
        let id = this.ctx.params.id
        let sql = 'SELECT article.id as id,'+
            'article.title as title,'+
            'article.introduce as introduce,'+
            'article.article_content as article_content,'+
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
            'article.view_count as view_count ,'+
            'type.typeName as typeName ,'+
            'type.id as typeId '+
            'FROM article LEFT JOIN type ON article.type_id = type.Id '+
            'WHERE article.id='+id
        const result = await this.app.mysql.query(sql)
        this.ctx.body = {data:result}
    }

    //得到所有的文章类别信息
    async getTypeInfo() {
        const result = await this.app.mysql.select('type')
        this.ctx.body = {data:result}
    }

    //根据列别id获得文章列表

//根据类别ID获得文章列表
    async getListById(){
        let id = this.ctx.params.id
        let sql = 'SELECT article.id as id,'+
            'article.title as title,'+
            'article.introduce as introduce,'+
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
            'article.view_count as view_count ,'+
            'type.typeName as typeName '+
            'FROM article LEFT JOIN type ON article.type_id = type.Id '+
            'WHERE type_id='+id
        const result = await this.app.mysql.query(sql)
        this.ctx.body={data:result}

    }

}

module.exports = HomeController