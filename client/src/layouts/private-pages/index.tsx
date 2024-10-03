import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../component/sidebar'; 
import { Wrapper, CardWrapper } from './style'; 

const { Content } = Layout;

const PrivateLayout = (): JSX.Element => {
  return (
    <Wrapper>
      <Layout style={{ height: '100vh',overflow:"hidden" }}>
        <Sidebar /> 
        <Layout style={{ flexGrow: 1,overflow:'scroll' }}> 
          <Content style={{ padding: '24px', background: '#fff' }}>
            <CardWrapper>
              <Outlet /> 
            </CardWrapper>
          </Content>
        </Layout>
      </Layout>
    </Wrapper>
  );
};

export default PrivateLayout;
