/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { LockOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import Button from '../../../component/button';
import { showError, showSuccess } from '../../../services/toast'; // Import toast functions
import { useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../../../services/api'; // Import the hook
import { useForm } from 'antd/es/form/Form';

const ResetPasswordForm = (): JSX.Element => {
  const [form] = useForm();
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation(); // Initialize the hook

  const onFinish = async (values: { password: string; confirmPassword: string }): Promise<void> => {
    if (values.password !== values.confirmPassword) {
      showError("Passwords do not match"); // Show error if passwords do not match
      return;
    }

    try {
      const response = await resetPassword({ password: values.password }).unwrap(); // Call reset password API
      showSuccess(response.message || "Password reset successfully"); // Show success message
      form.resetFields(); // Reset form fields
      navigate('/login'); // Navigate to login page after success
    } catch (error: any) {
      showError(error.data?.message || "Failed to reset password"); // Show error message
    }
  };

  return (
    <Form form={form} onFinish={onFinish} style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your new password',
          },
          {
            min: 6,
            message: 'Password must be at least 6 characters',
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="New Password"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: 'Please confirm your new password',
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Confirm New Password"
        />
      </Form.Item>

      <Form.Item>
        <Button style={{ justifyContent: 'center' }} value='Reset Password' type='primary' htmlType='submit' block>
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ResetPasswordForm;
