/* eslint-disable no-console */
import React, { useRef } from 'react';
import { Modal, Form, Select, FormInstance } from 'antd';

interface ReSubscribeModalProps {
  visible: boolean;
  onOk: (values: Record<string, any>) => void; // Explicitly typing 'values'
  onCancel: () => void;
}

const { Option } = Select; // Destructure Option from Select

const ReSubscribeModal: React.FC<ReSubscribeModalProps> = ({ visible, onOk, onCancel }) => {
  const formRef = useRef<FormInstance | null>(null); // Use FormInstance to type the form ref

  return (
    <Modal
      title="Re-Subscribe"
      visible={visible}
      onOk={() => {
        const form = formRef.current;
        if (form) {
          form
            .validateFields()
            .then((values: Record<string, any>) => { // Explicitly typing 'values'
              onOk(values); // Only send subsType to onOk
              form.resetFields();
            })
            .catch((info: any) => { // Explicitly typing 'info'
              console.log('Validate Failed:', info);
            });
        }
      }}
      onCancel={onCancel}
    >
      <Form layout="vertical" ref={formRef}>
        <Form.Item
          label="Subscription Type"
          name="subsType"
          rules={[{ required: true, message: 'Please select the subscription type!' }]} // Update message
        >
          <Select placeholder="Select subscription type">
            <Option value="basic">Basic</Option>
            <Option value="standard">Standard</Option>
            <Option value="premium">Premium</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReSubscribeModal;
