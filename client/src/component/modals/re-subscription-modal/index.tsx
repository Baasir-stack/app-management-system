/* eslint-disable no-console */
import React, { useRef, useState, useEffect } from 'react';
import { Modal, Form, Select, FormInstance, Typography, Spin } from 'antd';
import { useGetSubPlanDetailsQuery } from '../../../services/api'; // Adjust the import based on your setup
import { showSuccess } from '../../../services/toast';

interface SubscriptionPlan {
  _id: string;
  name: string;
  amount: number;
  duration: string;
}

interface ReSubscribeModalProps {
  visible: boolean;
  onOk: (values: Record<string, any>) => void;
  onCancel: () => void;
}

const { Option } = Select;
const { Text } = Typography;

const ReSubscribeModal: React.FC<ReSubscribeModalProps> = ({ visible, onOk, onCancel }) => {
  const formRef = useRef<FormInstance | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

  
  const { data: subscriptionPlans, isLoading } = useGetSubPlanDetailsQuery({});

  const handlePlanChange = (value: string) => {
    const selected = subscriptionPlans?.data?.find((plan: SubscriptionPlan) => plan.name === value); 
    setSelectedPlan(selected || null);
  };

  useEffect(() => {
   
    if (visible) {
      setSelectedPlan(null);
    }
  }, [visible]);

  const handleOk = async () => {
    const form = formRef.current;
    if (form) {
      try {
        const values = await form.validateFields();
        await onOk(values); 
        showSuccess("App has been subscribed successfully");
        form.resetFields();
      } catch (info) {
        console.log('Validate Failed:', info);
      }
    }
  };

  return (
    <Modal
      title="Subscribe"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      {isLoading ? (
        <Spin tip="Loading subscription plans..." />
      ) : (
        <Form layout="vertical" ref={formRef}>
          <Form.Item
            label="Subscription Plan"
            name="subsType"
            rules={[{ required: true, message: 'Please select the subscription plan!' }]}
          >
            <Select placeholder="Select subscription plan" onChange={handlePlanChange}>
              {Array.isArray(subscriptionPlans?.data) &&
                subscriptionPlans.data.map((plan: SubscriptionPlan) => (
                  <Option key={plan._id} value={plan.name}>
                    {plan.name.charAt(0).toUpperCase() + plan.name.slice(1)}
                  </Option>
                ))}
            </Select>
          </Form.Item>

      
          {selectedPlan && (
            <div style={{ marginTop: '16px' }}>
              <Text>
                <strong>Amount:</strong> ${selectedPlan.amount}
              </Text>
              <br />
              <Text>
                <strong>Duration:</strong> {selectedPlan.duration}
              </Text>
            </div>
          )}
        </Form>
      )}
    </Modal>
  );
};

export default ReSubscribeModal;
