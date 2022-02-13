import React, { useState, useEffect } from 'react';
import { marked} from 'marked' //要安装一下 //处理markdown的
import '../static/AddArticle.css'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import axios from 'axios' //引入后台获得数据的方法
import servicePath from '../config/apiUrl'
const { Option } = Select // 下拉列表中的每一项，这个需要解析出来
const { TextArea } = Input // 多行文本框，这个是在Input里面的，所以注意引入的方式
function AddArticle(props){
    const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('文章内容预览') //html内容
    const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('待编辑') //简介的html内容
    const [showDate,setShowDate] = useState()   //发布日期
    const [updateDate,setUpdateDate] = useState() //修改日志的日期
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType,setSelectType] = useState('请选择类型') //选择的文章类别
    const renderer = new marked.Renderer()
    /*支持文档 https://marked.js.org/using_advanced*/
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    });

    const selectTypeHandle = value =>{
        setSelectType(value)
    }

    const getTypeInfo =()=>{
        axios({
            method:'get',
            url:servicePath.getTypeInfo,
            // header:{ 'Access-Control-Allow-Origin':'*' },
            /*如果要使用跨域cookie，就要加这个东西,我们的中间件就要来检验我们的cookie。*/
            withCredentials: true
        }).then(
            res=>{
                /*这个没有登录是中间件给我们返回的*/
                if(res.data.data=="没有登录"){
                    /*如果没有登录，就把我们本地cookies删除掉*/
                    localStorage.removeItem('openId')
                    /*编程导航跳转*/
                    props.history.push('/')
                }else{
                    setTypeInfo(res.data.data)
                }
            }
        )
    }

    useEffect(()=>{
        getTypeInfo()
        let tmpId = props.match.params.id
        console.log(tmpId)
        if(tmpId){
            setArticleId(tmpId)
            getArticleById(tmpId)
        }
    },[])

    //从中台得到文章类别信息
    const changeContent = (e)=>{
        /*把文章的值赋为输入内容*/
        setArticleContent(e.target.value)
        let html=marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e)=>{
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }

    const getArticleById = (id)=>{
        axios(servicePath.getArticleById+id,{
            withCredentials: true,
            // header:{ 'Access-Control-Allow-Origin':'*' }
        }).then(
            res=>{
                setArticleTitle(res.data.data[0].title)
                setArticleContent(res.data.data[0].article_content)
                let html=marked(res.data.data[0].article_content)
                setMarkdownContent(html)
                setIntroducemd(res.data.data[0].introduce)
                let tmpInt = marked(res.data.data[0].introduce)
                setIntroducehtml(tmpInt)
                setShowDate(res.data.data[0].addTime)
                setSelectType(res.data.data[0].typeId)
            }
        )
    }

    const saveArticle = ()=>{
        if(selectedType === '请选择类型'){
            message.error('请选择文章类别')
            return false
        }else if(!articleTitle){
            message.error('文章名称不能为空')
            return false
        }else if(!articleContent){
            message.error('文章内容不能为空')
            return false
        }else if(!introducemd){
            message.error('简介不能为空')
            return false
        }else if(!showDate){
            message.error('发布日期不能为空')
            return false
        }
        /*字面量定义一个date里面的对象，键名要和数据库的字段一样*/
        let dataProps={}   //传递到接口的参数
        dataProps.type_id = selectedType
        dataProps.title = articleTitle
        dataProps.article_content =articleContent
        dataProps.introduce =introducemd
        /*因为你传过来是2022-1-22的形式，要传入到数据库中，必须对时间做出转换*/
        let datetext= showDate.replace('-','/') //把字符串转换成时间戳
        /*访问的人数*/
        dataProps.addTime =(new Date(datetext).getTime())/1000
        if(articleId==0){
            dataProps.view_count =Math.ceil(Math.random()*100)+1000
            axios({
                method:'post',
                url:servicePath.addArticle,
                data:dataProps,
                withCredentials: true
            }).then(
                res=>{
                    setArticleId(res.data.insertId)
                    if(res.data.isScuccess){
                        message.success('文章保存成功')
                    }else{
                        message.error('文章保存失败');
                    }
                }
            )
        }
        else {
            /*update的一个规则,必须在对象里面有一个id字段里面指定要修改的一条数据库记录*/
            dataProps.id = articleId //就是要修改哪条
            axios({
                method: 'post',
                url: servicePath.updateArticle,
                data:dataProps,
                /*因为后端配置了CORS跨域,默认不带cookie,需要配置*/
                withCredentials:true
            }).then(
                res => {
                    if(res.data.isScuccess) {
                        message.success('文章修改成功')
                    }
                    else {
                        message.error('文章修改失败')
                    }
                })
        }
    }

    return (
        <div style={{height:"100%"}}>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10} >
                        <Col span={20}>
                            <Input
                                placeholder="文章标题"
                                size="large"
                                value={articleTitle}
                                onChange={e =>
                                    setArticleTitle(e.target.value)
                                }/>
                        </Col>
                        <Col span={4}>
                            &nbsp;
                            {/*onChange的时候，会自动把value传入到selectTypeHandle*/}
                            <Select defaultValue={selectedType} size="large" onChange={selectTypeHandle} >
                                {
                                    typeInfo.map((item,index)=> {
                                            return(<Option key={index} value={item.id}> {item.typeName}</Option>
                                            )})
                                }
                            </Select>
                        </Col>
                    </Row>
                    <br/>
                    <Row gutter={10} >
                        <Col span={12}>
                            <TextArea
                                value={articleContent}
                                className="markdown-content"
                                rows={35}
                                onChange={changeContent}
                                onPressEnter={changeContent}
                                placeholder="文章内容"/>
                        </Col>
                        <Col span={12}>
                            <div className="show-html"
                                 dangerouslySetInnerHTML={{__html:markdownContent}}></div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button type="primary"
                                    size="large"
                                    onClick={saveArticle}>
                                    发布文章
                            </Button>
                        </Col>
                        <Col span={24}>
                            <br/>
                            <TextArea
                                rows={4}
                                value={introducemd}
                                onChange={changeIntroduce}
                                onPressEnter={changeIntroduce}
                                placeholder="文章简介"/>
                            <div
                                className="introduce-html"
                                dangerouslySetInnerHTML = {{__html:'文章简介：'+ introducehtml}} >
                            </div>
                            <br/>
                        </Col>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    placeholder="发布日期"
                                    size="large"
                                    onChange={(date,dateString) => setShowDate(dateString)}
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}


export default AddArticle

