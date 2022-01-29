import React, { useState, useEffect } from 'react';
import { marked} from 'marked' //要安装一下 //处理markdown的
// 还要使用一个css样式
import '../static/AddArticle.css'
// 使用antd中想要的组件
// 因为是表单，所以肯定有input,还有对类别进行选择的组件Select,提交按钮,日期选择
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import axios from 'axios' //引入后台获得数据的方法
import servicePath from '../config/apiUrl'
const { Option } = Select // 下拉列表中的每一项，这个需要解析出来
const { TextArea } = Input // 多行文本框，这个是在Input里面的，所以注意引入的方式
function AddArticle(props){
    const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate,setShowDate] = useState()   //发布日期
    const [updateDate,setUpdateDate] = useState() //修改日志的日期
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType,setSelectType] = useState('请选择类型') //选择的文章类别
    const renderer = new marked.Renderer()
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
            /* header:{ 'Access-Control-Allow-Origin':'*' },*/
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

    useEffect(()=> {
        getTypeInfo()
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

    const saveArticle = ()=>{
        if(selectedType === '请选择类型'){
            message.error('必须选择文章类别')
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
        message.success('检验通过')
    }

    return (
        <div style={{height:"100%"}}>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10} >
                        <Col span={20}>
                            <Input
                                placeholder="博客标题"
                                size="large"
                                onChange={e =>
                                    setArticleTitle(e.target.value)
                                }/>
                        </Col>
                        <Col span={4}>
                            &nbsp;
                            <Select defaultValue={selectedType} size="large" onSelect={selectTypeHandle} >
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
                            <Button  size="large">暂存文章</Button>&nbsp;
                            <Button type="primary"
                                    size="large"
                                    onClick={
                                        saveArticle
                                    }

                            >发布文章</Button>
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

