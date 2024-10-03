/* eslint-disable no-console */
import { Button, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ConfirmationModal from '../../component/modals/delete-app-modal';
import AppModal from '../../component/modals/app-modal'; // Import your AppModal here
import { useSelector } from 'react-redux';
import { showError } from '../../services/toast';
import { RootState } from '../../store';
import { useGetAllAppsQuery } from '../../services/api';
import Splash from '../splash';
import { useNavigate } from 'react-router-dom';

interface AppDetail {
  key: string;
  title: string;
  desc: string;
  status: string;
  appId: string; 
  createdAt: string;
}

const AppDetails = (): JSX.Element => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data, error, isLoading, refetch:refetchApps } = useGetAllAppsQuery(user?.id); 
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [appToDelete, setAppToDelete] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedApp, setSelectedApp] = useState<AppDetail | null>(null); 
  const navigate = useNavigate();

  const showConfirmationModal = (key: string) => {
    setAppToDelete(key);
    setIsConfirmVisible(true);
  };

  const handleDeleteConfirm = () => {
    if (appToDelete) {
      console.log(`Deleting app with key: ${appToDelete}`);
    
    
      refetchApps();
    }
    setIsConfirmVisible(false);
    setAppToDelete(null);
  };

  const handleDeleteCancel = () => {
    setIsConfirmVisible(false);
    setAppToDelete(null);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Subscription',
      dataIndex: 'subscription',
      key: 'subscription',
      render: (_subscription: string, record: AppDetail) => (
        <Button type="link" onClick={() => navigate(`/subscription/${record.appId}`)}>
          View Details
        </Button>
      ),
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_text: string, record: AppDetail) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => showConfirmationModal(record.key)}
          />
        </>
      ),
    },
  ];

  if (isLoading) {
    return <Splash />;
  }

  if (error) {
    showError(`${error}`);
  }


  const handleEdit = (record: AppDetail) => {
    setSelectedApp(record);
    setIsModalVisible(true);
  };

  const handleCreateNewApp = () => {
    setSelectedApp(null); 
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    refetchApps();
  };

  return (
    <div>
      <div style={{ textAlign: 'right', marginBottom: 16 }}>
        <Button type="primary" onClick={handleCreateNewApp}>
          Create New App
        </Button>
      </div>
      <Table columns={columns} dataSource={data?.apps} />

    
      <AppModal
        visible={isModalVisible}
        onClose={handleModalClose}
        initialData={selectedApp ? { title: selectedApp.title, desc: selectedApp.desc, status: selectedApp.status === 'active' } : undefined}
        appId={selectedApp?.appId}
        refetchApps={refetchApps}
      />

    
      <ConfirmationModal
        visible={isConfirmVisible}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};

export default AppDetails;
