/* eslint-disable no-console */
import { LogoutOutlined } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppName } from './style';
import { useLogoutMutation } from '../../services/api';

const { Sider } = Layout;

const Sidebar = (): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 
  const [logout] = useLogoutMutation(); 

  const handleLogout = async () => {
    try {
      await logout({}); 
      navigate('/'); 
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const selectedKey = location.pathname === '/app' ? 'appDetails' : 'profileDetails';

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      style={{ height: '100vh',transition: 'all 0.2s ease' }} 
    >
      <AppName>{!collapsed ? 'App Management System' : 'App'}</AppName>

      <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
        <Menu.Item key="appDetails" onClick={() => navigate('/app')}>
          App Details
        </Menu.Item>
        <Menu.Item key="profileDetails" onClick={() => navigate('/profile')}>
          Profile Details
        </Menu.Item>
      </Menu>

      <div style={{ position: 'absolute', bottom: '55px', width: '100%', textAlign: 'center' }}>
        <Button 
          icon={<LogoutOutlined />} 
          type="primary" 
          danger
          style={{ width: collapsed ? '90%' : '100%' }} 
          onClick={handleLogout}
        >
          {!collapsed && 'Logout'} 
        </Button>
      </div>
    </Sider>
  );
};

export default Sidebar;
