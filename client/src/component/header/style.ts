import { Layout } from "antd";
import styled from "styled-components";

export const Wrapper = styled.div`
background-color: #232F3E;
width: 100%;
`
export const LayoutWrapper = styled(Layout)`
height: 80px;
width: 100%;
padding: 0 1rem;
background-color: #000;
display: flex;
flex-direction: row;

`

export const HeaderWrapper = styled(Layout.Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #001529;
  padding: 0 24px;
  width: 100%;
`;

export const Title = styled.div`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
`;