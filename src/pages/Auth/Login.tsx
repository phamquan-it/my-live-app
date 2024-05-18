import React from 'react';
import { Form, Input, Button, Carousel } from 'antd';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import Title from 'antd/es/typography/Title';
import { Ubuntu} from 'next/font/google'

const ubuntu = Ubuntu({
  weight: '400',
  subsets: ['latin'],
})
const LoginForm = () => {
  const t = useTranslations('Form');

  const layout = {
    labelCol: { span: 24 }, // Set the label width to take up the full width
    wrapperCol: { span: 24 }, // Set the input width to take up the full width
  };
const contentStyle: React.CSSProperties = {
  marginTop:"30px",
  height: '260px',
  color: '#fff',
  lineHeight: '290px',
  textAlign: 'center',
  background: '#364d79',
};
  return (
    <>
    
    <div className={`w-1/2 m-auto flex items-center ${ubuntu.className}`} style={{height:"100vh"}}>
    <div className='w-full border rounded shadow'>
    
    <div className='flex gap-5'>
    <div className='w-1/2 h-100 bg rounded justify-center' style={{backgroundColor:"purple"}}>
    <Carousel autoplay>
    <div>
      <h3 style={contentStyle}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
        
    </div>
    <Form className='w-1/2 py-5 pe-3'
      name="basic"
      initialValues={{ remember: true }}
      {...layout}
    >
      <Title level={3} className='text-center' style={{color:"purple"}}>{t('login')}</Title>
      <Form.Item
        label={t("username")}
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t("password")}
        name="password"
        rules={[
          { required: true, message: 'Please input your password!' },
          { min:8, message:"Password should have at least 8 characters"}
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Button type='link' style={{color:"purple"}} onClick={()=>{
        // Handle forgot password
      }}>{t('forgot')}</Button>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {t('login')}
        </Button> <Button htmlType="submit">
          {t('register')}
        </Button>
      </Form.Item>
      
    </Form>
    </div>
    </div>
    </div>
    </>
  );
};

export default LoginForm;

export async function getStaticProps({locale}: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default
    }
  };
}
