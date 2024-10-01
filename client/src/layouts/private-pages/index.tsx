import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../component/sidebar'; 
import { Wrapper, CardWrapper } from './style'; 

const { Content } = Layout;

const PrivateLayout = (): JSX.Element => {
  return (
    <Wrapper>
      <Layout style={{ height: '100vh' }}>
        <Sidebar /> {/* Render the Sidebar on the left */}
        <Layout style={{ flexGrow: 1 }}> {/* Allow this layout to grow and take up remaining space */}
          <Content style={{ padding: '24px', background: '#fff' }}>
            <CardWrapper>
              <Outlet /> {/* Render the selected page content here */}
            </CardWrapper>
          </Content>
        </Layout>
      </Layout>
    </Wrapper>
  );
};

export default PrivateLayout;
