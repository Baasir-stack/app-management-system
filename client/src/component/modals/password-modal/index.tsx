/* eslint-disable no-console */
// PasswordModal.tsx
import React from 'react';
import { Modal, Form, Input } from 'antd';

interface PasswordModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: { currentPassword:string ,password: string; confirmPassword: string }) => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ visible, onClose, onSubmit }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
    } catch (info) {
      console.log('Validation Failed:', info);
    }
  };

  return (
    <Modal
      title="Change Password"
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Submit"
    >
      <Form form={form}>
        <Form.Item
          name="currentPassword"
          rules={[{ required: true, message: 'Please input your current password!' }]}
        >
          <Input.Password placeholder="Current Password" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your new password!' }]}
        >
          <Input.Password placeholder="New Password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[{ required: true, message: 'Please confirm your password!' }]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>
      </Form>
    </Modal>  );
};

export default PasswordModal;
