import React,{useState} from 'react';
import { Layout, Menu, Breadcrumb} from 'antd';
import { Route } from "react-router-dom";
import AddArticle from './AddArticle'
import '../static/AdminIndex.css'
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    UserOutlined,
} from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
function AdminIndex(){
    const [collapsed,setCollapsed] = useState(false)
    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    };
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider  collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={ <PieChartOutlined /> }>工作台</Menu.Item>
                    <Menu.Item key="2" icon={ <DesktopOutlined /> }>添加文章</Menu.Item>
                    <SubMenu key="sub1" icon ={ <UserOutlined /> } title="文章管理">
                        <Menu.Item key="3">添加文章</Menu.Item>
                        <Menu.Item key="4">文章列表</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9" icon={<FileOutlined />}>
                        留言管理
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout >
                {/*<Header style={{ background: '#fff', padding: 0 }} />*/}
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>工作台</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <div>
                            {/* 因为是到这个页面就要显示AddArticle的内容，坐立Route中加一个exact精确匹配 */}
                            {/* 意思就是路径是/index AddArticle这个组件就会显示 */}
                            <Route path="/index/" exact component={AddArticle} />
                        </div>
                    </div>
                </Content>
                {/*<Footer style={{ textAlign: 'center' }}>许绵渠</Footer>*/}
            </Layout>
        </Layout>
    )
}

export default AdminIndex