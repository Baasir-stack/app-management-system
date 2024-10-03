/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MailOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import Button from '../../../component/button';
import { useNavigate } from 'react-router-dom';
import { useForgetPasswordMutation } from '../../../services/api'; 
import { showError, showSuccess } from '../../../services/toast'; 
import { useForm } from 'antd/es/form/Form';

const ForgotPasswordForm = (): JSX.Element => {
  const [form] = useForm();
  const navigate = useNavigate();
  const [forgotPassword] = useForgetPasswordMutation(); 

  const onFinish = async (values: { email: string }): Promise<void> => {
    try {
 
      if (typeof values.email !== 'string') {
        throw new Error('Email must be a string');
      }
      const response = await forgotPassword(values.email).unwrap();
      showSuccess(response.message || 'Password reset email sent! Please check your inbox.'); 
      form.resetFields(); 
      navigate('/');
    } catch (error: any) {
 
      showError(error.data?.message || 'Failed to send password reset email.'); 
    }
  };

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }} 
      >
        <h2>Forgot Password</h2>
        <p>Please enter your registered email address to receive a password reset link.</p>

        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Please enter a valid email address',
            },
            {
              required: true,
              message: 'Email is required',
            },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item>
          <Button style={{ justifyContent: 'center' }} value="Send Reset Link" type="primary" htmlType="submit" block>
            Send Reset Link
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ForgotPasswordForm;
