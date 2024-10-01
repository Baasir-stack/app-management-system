/* eslint-disable @typescript-eslint/no-unused-vars */
import { MailOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import Button from '../../../component/button';
import { useNavigate } from 'react-router-dom';
import { useForgetPasswordMutation } from '../../../services/api'; // Import the hook
import { showError, showSuccess } from '../../../services/toast'; // Import toast functions
import { useForm } from 'antd/es/form/Form';

const ForgotPasswordForm = (): JSX.Element => {
  const [form] = useForm();
  const navigate = useNavigate();
  const [forgotPassword] = useForgetPasswordMutation(); // Initialize the hook

  const onFinish = async (values: { email: string }): Promise<void> => {
    try {
      // Call the forgot password API
      const response = await forgotPassword(values).unwrap();
      showSuccess(response.message || 'Password reset email sent! Please check your inbox.'); // Show success toast
      form.resetFields(); // Reset form fields
      navigate('/login'); // Navigate to login page after success
    } catch (error: any) {
      // Handle errors
      showError(error.data?.message || 'Failed to send password reset email.'); // Show error toast
    }
  };

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }} // Centering form
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
