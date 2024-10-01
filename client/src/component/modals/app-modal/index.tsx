/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Switch, Button } from 'antd';
import { useCreateNewAppMutation, useEditAppMutation } from '../../../services/api'; // Assuming you have a hook for fetching all apps
import { showSuccess, showError } from '../../../services/toast';

interface AppModalProps {
  visible: boolean;
  onClose: () => void;
  initialData?: { title: string; desc: string; status: boolean };
  appId?: string;
  refetchApps:()=>void
}

interface AppData {
  title: string;
  desc: string;
  status: boolean;
}

const AppModal: React.FC<AppModalProps> = ({ visible, onClose, initialData, appId,refetchApps }) => {
  const [form] = Form.useForm();
  const [createNewApp] = useCreateNewAppMutation();
  const [editApp] = useEditAppMutation();
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        title: initialData.title,
        desc: initialData.desc,
        status: initialData.status,
      });
    } else {
      form.resetFields(); // Reset fields if no initial data is provided (for creating a new app)
    }
  }, [initialData, form]);

  const handleSubmit = async (values: AppData) => {
    setLoading(true); // Set loading state
    try {
      if (appId) {
        const response = await editApp({ appData: { ...values, status: values.status ? 'active' : 'inactive' }, appId }).unwrap();
        refetchApps(); // No await needed unless you want to handle the promise.
        showSuccess(response.message || 'App updated successfully!');
      } else {
        const response = await createNewApp({ ...values, status: values.status ? 'active' : 'inactive' }).unwrap();
        refetchApps(); // No await needed unless you want to handle the promise.
        showSuccess(response.message || 'App created successfully!');
      }
      onClose();
    } catch (error: unknown) {
      console.error('Error:', error);
      if (error instanceof Error) {
        showError(error.message || 'An error occurred while processing your request.');
      } else {
        showError('An unknown error occurred.');
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Modal
      visible={visible}
      title={appId ? 'Edit App' : 'Create New App'}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="App Title" name="title" rules={[{ required: true, message: 'Please input the app title!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="desc" rules={[{ required: true, message: 'Please input the app description!' }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Status" name="status" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {appId ? 'Update App' : 'Create App'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AppModal;
