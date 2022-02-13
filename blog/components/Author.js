
import {Avatar,Divider} from 'antd'
import '../public/style/components/author.css'
import {
    GithubOutlined,
    QqOutlined,
    WechatOutlined
} from '@ant-design/icons'

const Author =()=>{

    return (
        <div className="author-div comm-box">
            <div>
                <Avatar size={100} src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.wmzhe.top%2Fuploadimg%2Fpc%2F02%2F02aa%2F02aa4af8e3cac9e52d75a83a55c56645.jpg&refer=http%3A%2F%2Fimg.wmzhe.top&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644236782&t=cfbafca1b1bf2405edad7da7563ad5b7" />
            </div>
            <div className="author-introduction">
                x
                <Divider>社交账号</Divider>
                <Avatar size={28} icon={<GithubOutlined/>} className="account"  />
                <Avatar size={28} icon= {<QqOutlined/>}className="account" />
                <Avatar size={28} icon={<WechatOutlined/>}  className="account"/>
            </div>
        </div>
    )

}

export default Author