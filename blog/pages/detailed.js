import React from 'react'
import Head from 'next/head'
import axios from 'axios'
import {Row, Col,Breadcrumb,Affix} from 'antd'
import {CalendarOutlined, FireOutlined, FolderOpenOutlined} from "@ant-design/icons";
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../public/style/pages/detailed.css'
//解析markdown代码
import {marked} from 'marked'
//代码高亮
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/tocify.tsx'
import  servicePath  from '../config/apiUrl'
const Detailed = (props) => {
    let articleContent = props.article_content
    const tocify = new Tocify()
    const renderer = new marked.Renderer();
    //### xumianqu 这里的xumianqu代表的是文本，前面的#号代表的是等级
    renderer.heading = function(text, level, raw) {
        const anchor = tocify.add(text, level);
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
            //传入一个code，用hljs的自动检测，针对各种语言进行高亮显示
            return hljs.highlightAuto(code).value;
        }
    });
    //用marked这个方法进行渲染
    let html = marked(articleContent)
    return(
        <>
        <Head>
            <title>博客详细页</title>
        </Head>
        <Header />
        <Row className="comm-main" type="flex" justify="center">
            <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                <div>
                    <div className="bread-div">
                        <Breadcrumb>
                            <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                            <Breadcrumb.Item>日常记录</Breadcrumb.Item>
                            <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div>
                        <div className="detailed-title">
                            {props.title}
                        </div>
                        <div className="list-icon center">
                            <span><CalendarOutlined /> {props.addTime}</span>
                            <span><FolderOpenOutlined /> {props.typeName}</span>
                            <span><FireOutlined /> {props.view_count}人</span>
                        </div>
                        {/*dangerouslySetInnerHTML 是react为浏览器Dom做的innerHTML的替代方案*/}
                        <div className="detailed-content" dangerouslySetInnerHTML={{ __html: html }}>
                        </div>
                    </div>

                </div>
            </Col>
            <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                <Author />
                <Advert />
                <Affix offsetTop={5}>
                    <div className="detailed-nav comm-box">
                        <div className="nav-title">文章目录</div>
                        <div className="toc-list">
                            {tocify && tocify.render()}
                        </div>
                    </div>
                </Affix>
            </Col>
        </Row>
        <Footer/>
    </>)
    //前台进行跳转，给出一条oathname中有对象，对象包括了路径和后面的参数
}

Detailed.getInitialProps = async (context)=>{
    //接受到上下文，上下文上的query对象上有id这个键名，取出键值
    console.log(context.query.id)
    let id = context.query.id
    const promise = new Promise((resolve)=>{
        console.log(id)
        axios(servicePath.getArticleById+id).then(
            (res)=>{
                console.log('打印结果',res)
                resolve(res.data.data[0])
            }
        )
    })
    return await promise
}


export default Detailed