import { Button, Table } from 'antd';
import { useState } from 'react';
import { useGetAllSubDetailsQuery, useCreateSubscriptionMutation } from '../../services/api';
import { useParams } from 'react-router-dom';
import { Splash } from '../../pages';
import ReSubscribeModal from '../../component/modals/re-subscription-modal';

interface Subscription {
  subsType: string;
  subsStartDate: string;
  subsEndDate: string;
  amount: number;
  createdAt: string;
  isExpired: boolean;
}

const SubscriptionsPage = (): JSX.Element => {
  const { appId } = useParams<{ appId: string }>();
  const { data, error, isLoading , refetch} = useGetAllSubDetailsQuery(appId);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createSubscription] = useCreateSubscriptionMutation();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async (values: any) => {
    await createSubscription({ ...values, appId });
    await refetch()
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const subscriptions: Subscription[] = data?.subscriptions || [];

  const activeSubscriptions = subscriptions.filter(sub => !sub.isExpired);
  const hasActiveSubscriptions = activeSubscriptions.length > 0;

  const columns = [
    {
      title: 'Subscription Type',
      dataIndex: 'subsType',
      key: 'subsType',
    },
    {
      title: 'Start Date',
      dataIndex: 'subsStartDate',
      key: 'subsStartDate',
    },
    {
      title: 'End Date',
      dataIndex: 'subsEndDate',
      key: 'subsEndDate',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Status',
      dataIndex: 'isExpired',
      key: 'isExpired',
      render: (isExpired: boolean) => (
        <b style={{ color: isExpired ? 'red' : 'green' }}>
          {isExpired ? 'Expired' : 'Active'}
        </b>
      ),
    },
  ];

  return (
    <div>
      <h2>Subscriptions for App {appId}</h2>
        {!isLoading && data && subscriptions.length > 0 && !hasActiveSubscriptions && (
        <Button 
          type="primary" 
          onClick={showModal} 
          style={{ marginBottom: 16 }}
        >
          Re-Subscribe
        </Button>
      )}

      {!isLoading && data && subscriptions.length === 0 && (
        <Button 
          type="primary" 
          onClick={showModal} 
          style={{ marginBottom: 16 }}
        >
          Subscribe
        </Button>
      )}
      <Table
        columns={columns}
        dataSource={subscriptions.map(sub => ({
          ...sub,
          rowClassName: sub.isExpired ? 'expired-row' : ''
        }))}
        rowClassName={(record) => (record.isExpired ? 'expired-row' : '')}
      />

      <ReSubscribeModal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      />

      {error && <div>Error: {(error as any).data?.message || 'An error occurred'}</div>}
      {isLoading && <Splash />}
    </div>
  );
};

export default SubscriptionsPage;