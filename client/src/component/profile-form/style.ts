import styled from "styled-components";
 
export const LoaderOverlay = styled.div`
 position: absolute; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(211, 211, 211, 0.3); 
  z-index: 10; 
`;