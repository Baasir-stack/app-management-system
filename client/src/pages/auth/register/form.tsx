import { LockOutlined, UserOutlined, UploadOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Form, Input, Upload, Row, Col } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { showError, showSuccess } from '../../../services/toast'
import { useForm } from 'antd/es/form/Form'
import { useState } from 'react'
import { useRegisterMutation } from '../../../services/api'


const RegisterForm = (): JSX.Element => {
  const [form] = useForm()
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [fileList, setFileList] = useState<any[]>([]) 
  const [register, { isLoading }] = useRegisterMutation()
  const navigate = useNavigate()

  const onFinish = async (values: any): Promise<void> => {
    const formData = new FormData();
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('email', values.email);
    formData.append('password', values.password);
    if (avatarFile) formData.append('avatar', avatarFile);
    
    try {
      const fulfilled = await register(formData).unwrap();
      showSuccess(fulfilled.message);
      navigate('/');
      form.resetFields();
    } catch (rejected) {
      const error = rejected as ErrorResponse;
      showError(error.data.message);
    }
  };

  const handleAvatarChange = (info: any) => {
    const file = info.file.originFileObj || info.file; 
    setAvatarFile(file);
    setFileList([info.file]); 
  }

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ remember: true }}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'Please input your first name!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="First Name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Please input your last name!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Last Name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { type: 'email', message: 'The input is not a valid email!' },
                { required: true, message: 'Please input your email!' }
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col xs={24}>
            <Form.Item label="Avatar" name="avatar">
              <Upload
                beforeUpload={() => false} 
                onChange={handleAvatarChange}
                fileList={fileList} 
              >
                <Button icon={<UploadOutlined />}>Upload Avatar</Button>
              </Upload>
        
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col xs={24}>
            <Form.Item>
              <Button loading={isLoading} type="primary" htmlType="submit" block>
                Register
              </Button>
              <span>Already have an account? <Link to="/">Login</Link></span>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default RegisterForm;
