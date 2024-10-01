// import React from 'react'
// import { Col, Row } from 'antd'
// import { LayoutWrapper, Wrapper } from './style'
// import TypoGraphy from '../typography'
// import Button from '../button'
// import { useNavigate } from 'react-router-dom'
// import { useLogoutMutation } from '../../services/api'
// import { showError, showSuccess } from '../../services/toast'


// const AppHeader: React.FC = () => {
//     const navigate = useNavigate()
//     const [logoutUser] = useLogoutMutation()

//     const handleClick = () => {
//         logoutUser(null).unwrap()
//             .then((fulfilled: IKeyValue): void => {
//                 showSuccess(fulfilled?.message)
//                 navigate("/")
//             })
//             .catch((rejected) => {
//                 showError(rejected.data.message)
//             })
//     }

//     return (
//         <Wrapper>
//             <LayoutWrapper >
//                 <Row align={'middle'} >
//                     <Col span={22}> <TypoGraphy level={2} style={{ color: "#fff" }} value='Multi Vendor Store' /> </Col>
//                     <Col> <Button  onClick={handleClick} >Logout </Button> </Col>
//                 </Row>
//             </LayoutWrapper>

//         </Wrapper>
//     )
// }


// export default AppHeader
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../services/api';
import { showError, showSuccess } from '../../services/toast';
import TypoGraphy from '../typography';
import { HeaderWrapper, Title } from './style'; // Import styled components
import { Button } from 'antd';

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const [logoutUser] = useLogoutMutation();

  const handleLogout = () => {
    logoutUser(null)
      .unwrap()
      .then((fulfilled: IKeyValue): void => {
        showSuccess(fulfilled?.message);
        navigate('/');
      })
      .catch((rejected) => {
        showError(rejected.data.message);
      });
  };

  return (
    <HeaderWrapper>
      {/* Left Side: Title */}
      <Title>
        <TypoGraphy level={2} style={{ color: '#fff' }} value="App Management System" />
      </Title>

      {/* Right Side: Logout Button */}
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </HeaderWrapper>
  );
};

export default AppHeader;

