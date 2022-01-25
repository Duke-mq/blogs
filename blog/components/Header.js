
import React ,{useState,useEffect} from 'react'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
import '../public/style/components/header.css'
import {Row,Col, Menu} from 'antd'
import { createFromIconfontCN } from '@ant-design/icons';
import {
    HomeOutlined,
  } from '@ant-design/icons';
const Header = () => {
    /*下面是定义一个初始文章类别数组，当navArray改变，执行useEffect*/
    const [navArray,setNavArray] = useState([])
    useEffect(()=> {
        //useEffect是异步的，不能直接使用异步，需要用一个变量承接异步方法，再去调用
        const feachData = async ()=> {
            const result = await axios(servicePath.getTypeInfo).then(
                (res)=> {
                    return res.data.data
                })
            setNavArray(result)
        }
        feachData() },[])

    //声明一个方法，来跳转到页面
    const handleClick = (e)=> {
        if(e.key == 0) {
            Router.push('/index')
        }else {
            Router.push('/list?id=' + e.key)
        }
    }


    const IconFont= createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js', // 在 iconfont.cn 上生成
    });

    return(
        <div className="header">
        <Row type="flex" justify="center">
            <Col  xs={24} sm={24} md={10} lg={10} xl={10}>
                <span className="header-logo">MQ不是消息队列</span>
                <span className="header-txt">Reacter</span>
            </Col>
            <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                <Menu mode="horizontal" onClick={handleClick}>
                    <Menu.Item key="0">
                        <HomeOutlined/>
                        首页
                    </Menu.Item>
                    {
                        navArray.map((item)=> {
                            return(
                                <Menu.Item key={item.Id}>
                                    <IconFont type="home" />
                                    {item.typeName}
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
            </Col>
        </Row>
    </div>)
}


export default Header