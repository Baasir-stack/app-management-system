import { Card } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100vh; /* Full height for the layout */
  display: flex; /* Use flex to position sidebar and content side by side */
  background-color: #2c3e50; /* Darker color for private pages */
`;

export const CardWrapper = styled(Card)`
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Added shadow for a lifted effect */
  width: 100%; /* Ensure card takes full width */
  min-height: 100%; /* Ensure it expands vertically with the content */


`;

export const HeaderWrapper = styled.div`
  display: flex;
  background-color: #34495e; /* Darker header background */
  color: white; /* Light text color for contrast */
`;
