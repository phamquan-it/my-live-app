
import styles from '@/styles/home.module.css'
import { Affix, Button, Image, Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
const Home = ()=>{
   
  return(
    <>
   <Layout>
         <Header style={{backgroundColor:"rgba(192,38,211, 0.5)", height:100 }} className='flex items-center justify-between'>
            <p>ant logo</p>
            
            <Menu className='font-semibold' mode='horizontal' style={{width:600, backgroundColor:"transparent"}} id='nav-menu' items={[
              { label: 'Trang chủ', key: 'item-1' }, // 菜单项务必填写 key
              { label: 'Dịch vụ', key: 'item-2' },
              { label: 'Hướng dẫn', key: 'item-3' },
              { label: 'Giới thiệu', key: 'item-4' }
            ]} />;
            <div>
            <Button type="primary" style={{ backgroundColor:"green !important"}}>Đăng nhập</Button>
            <Button type="primary" style={{ backgroundColor:"blue"}} className='ms-2'>Đăng ký</Button>
            </div>

         </Header>
         <div style={{ height: 500}}>
            <Image src='https://img.thuthuatphanmem.vn/uploads/2018/10/01/hinh-anh-nen-mau-hong_040307183.jpg' width={window.innerWidth} height={500} alt='' preview={false}></Image>
         </div>
     <Layout>
       {/* <Sider>left sidebar</Sider> */}
       <Content>
       <div className="w-11/12 m-auto">
        <Title level={3} className='mt-4'>Nền tảng ứng dụng</Title>
    </div>
       </Content>
       {/* <Sider>right sidebar</Sider> */}
     </Layout>
     {/* <Footer style={{backgroundColor:"purple",color:"white"}} className=''>
        <div className="row">
       <span className='font-semibold uppercase'>
       Ant title
       </span>
       <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. A molestias blanditiis et facere dolor facilis suscipit ullam perferendis placeat quibusdam! Nulla nihil doloribus accusantium aspernatur ratione dolores officia similique architecto.</p>
        </div>
     </Footer> */}
   </Layout>
    </>
);
} 
 export default Home