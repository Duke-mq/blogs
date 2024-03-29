
import React,{useState,useEffect} from 'react'
import Head from 'next/head'
import {Row, Col , List ,Breadcrumb  } from 'antd'
import {CalendarOutlined, FireOutlined, FolderOpenOutlined} from "@ant-design/icons";
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../public/style/pages/list.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'
// import Router from 'next/router'
import Link from 'next/link'
const ArticleList = (props) =>{
    const [ mylist , setMylist ] = useState(props.data);
    console.log(mylist)
    useEffect(()=>{
        setMylist(mylist)
    })
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                    <div>
                        <div className="bread-div">
                            <Breadcrumb>
                                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                                <Breadcrumb.Item>{mylist[0].typeName}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>

                        <List
                            itemLayout="vertical"
                            dataSource={mylist}
                            renderItem={item => (
                                <List.Item>
                                    <div className="list-title">
                                        <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                                            <a>{item.title}</a>
                                        </Link>
                                    </div>
                                    <div className="list-icon">
                                        <span><CalendarOutlined />{item.addTime}</span>
                                        <span><FolderOpenOutlined />{item.typeName}</span>
                                        <span><FireOutlined /> {item.view_count}</span>
                                    </div>
                                    <div className="list-context">{item.introduce}</div>
                                </List.Item>
                            )}
                        />
                    </div>
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author />
                    <Advert />
                </Col>
            </Row>
            <Footer/>
        </>
    )
}



ArticleList.getInitialProps = async (context)=>{
    let id =context.query.id
    console.log(id)
    const promise = new Promise((resolve)=>{
        axios(servicePath.getListById+id).then(
            (res)=>resolve(res.data)
        )
    })
    return await promise
}

export default ArticleList