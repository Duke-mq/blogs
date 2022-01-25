import React,{useState} from 'react';
import 'antd/dist/antd.css'
import { Card, Input, Button ,Spin } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons'; //antd的组件
import '../static/Login.css'
import axios from 'axios'
import  servicePath from '../config/apiUrl'
import {message} from 'antd'
function Login(props){
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const checkLogin = () => {
        setIsLoading(true)
        if (!username) {
            message.error('用户名不能为空');
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return false;
        } else if (!password) {
            message.error('密码不能为空');
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return false;
        }
        let dataProps = {
            'username': username,
            'password': password
        }
        console.log(dataProps)
        axios({
            method: 'post',
            url: servicePath.checkLogin,
            data: dataProps, //传的的参数
            withCredentials: true,//前后端共享session
        }).then(
            res => {
                console.log(res.data.data);
                // 把放重复提交先放这里
                //把loading撤掉，能让他进行提交
                setIsLoading(false) //撤掉，让它能提交
                console.log(res.data)
                if (res.data.data === '登录成功') { //我们自己写的data
                    // 把返回的openId缓存起来,接口自带
                    localStorage.setItem('openId', res.data.openId) //是H5的自带的，也是key-value形式
                    // 然后跳转，跳转，进行编程导航的形式跳转
                    props.history.push('/index') //??
                    //要在组件的函数中传递props先
                    // 因为我们要跳转，用编程导航的形式跳转，所以需要用到这个props
                } else {
                    message.error('用户名密码错误')
                }
            }
        )
    }

    return (
        <div className="login-div">
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="xumianqu  System" bordered={true} style={{ width: 400 }} >
                    <Input
                        id="userName"
                        size="large"
                        placeholder="Enter your userName"
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(e)=>{
                            setUsername(e.target.value)}}
                    />
                    <br/><br/>
                    <Input
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(e)=>{
                            setPassword(e.target.value)}}
                    />
                    <br/><br/>
                    <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
                </Card>
            </Spin>
        </div>
    )
}
export default Login