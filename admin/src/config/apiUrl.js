let ipUrl = 'http://127.0.0.1:7001/admin/'
let servicePath = {//服务端的地址
    // 变成key-value形式 接口
    checkLogin: ipUrl + 'checkLogin',//检查用户名和密码
    getTypeInfo: ipUrl + 'getTypeInfo',//获得文章类别信息
    addArticle: ipUrl + 'addArticle',//添加文章
    updateArticle: ipUrl + 'updateArticle',//更新文章
    getArticleList: ipUrl + 'getArticleList',//获取文章列表
    delArticle: ipUrl + 'delArticle/', //删除文章，因为要传id，所以记得加一个/
    getArticleById: ipUrl + 'getArticleById/', //根据id查询文章，因为要传id，所以记得加一个/
}
//要让外部能使用
export default servicePath