/* eslint-disable no-console */
import { LogoutOutlined } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {AppName} from './style'
import { useLogoutMutation } from '../../services/api';

const { Sider } = Layout;

const Sidebar = (): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [logout] = useLogoutMutation(); 

  const handleLogout = async () => {
    try {
      await logout({}); // Trigger the logout mutation
      navigate('/'); // Redirect the user to the login page after logout
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      style={{ height: '100vh', transition: 'all 0.2s ease' }} // Smooth transition for collapse
    >
        {/* App Name at the Top */}
        <AppName>{!collapsed ? 'My App' : 'App'}</AppName>

      <Menu theme="dark" mode="inline">
        <Menu.Item key="appDetails" onClick={() => navigate('/app')}>
          App Details
        </Menu.Item>
        <Menu.Item key="profileDetails" onClick={() => navigate('/profile')}>
          Profile Details
        </Menu.Item>
      </Menu>


      <div style={{ position: 'absolute', bottom: '55px', width: '100%', textAlign: 'center' }}>
        <Button 
          icon={<LogoutOutlined  />} 
          type="primary" 
          danger
          style={{ width: collapsed ? 'auto' : '100%' }} 
          onClick={handleLogout}
        >
          {!collapsed && 'Logout'} 
        </Button>
      </div>
    </Sider>
  );
};

export default Sidebar;
