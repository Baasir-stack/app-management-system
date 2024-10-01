import styled from 'styled-components';

export const SidebarContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const AppName = styled.div`
  color: white;
  font-size: 20px;
  text-align: center;
  padding: 16px 0;
  background-color: #001529;
  transition: all 0.3s ease;
`;

export const LogoutContainer = styled.div`
  position: absolute;
  bottom: 55px;
  width: 100%;
  text-align: center;
  padding: 0 16px;
`;
