/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { LockOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import Button from '../../../component/button';
import { showError, showSuccess } from '../../../services/toast'; 
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation, useValidateResetPasswordTokenMutation } from '../../../services/api'; 
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import Splash from '../../splash';

const ResetPasswordForm = (): JSX.Element => {
  const [form] = useForm();
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>(); 
  const [validateToken] = useValidateResetPasswordTokenMutation(); 
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null); 
  const [resetPassword] = useResetPasswordMutation(); 

  useEffect(() => {
    const validate = async () => {
      if (token) {
        try {
          const response = await validateToken(token).unwrap();
          if (response.success) {
            setIsValidToken(true); 
          } else {
            setIsValidToken(false); 
          }
        } catch (error: any) {
          showError(error.data?.message || "Invalid or expired token");
          setIsValidToken(false); 
        
        }
      }
    };
    
    validate();
  }, [token, navigate, validateToken]);

  const onFinish = async ({ password, confirmPassword }: { password: string; confirmPassword: string }): Promise<void> => {
    if (password !== confirmPassword) {
      showError("Passwords do not match");
      return;
    }

    try {
      const response = await resetPassword({ token, password, confirmPassword }).unwrap(); 
      showSuccess(response.message || "Password reset successfully"); 
      form.resetFields(); 
      navigate('/'); 
    } catch (error: any) {
      showError(error.data?.message || "Failed to reset password"); 
    }
  };

  if (isValidToken === null) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}><Splash/></div>; 
  }

  if (isValidToken === false) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
        <h2>Invalid or expired token</h2>
        <p>Please request a new password reset link.</p>
      </div>
    );
  }

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
