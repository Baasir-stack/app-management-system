/* eslint-disable no-console */
import { Button, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ConfirmationModal from '../../component/modals/delete-app-modal';
import AppModal from '../../component/modals/app-modal'; // Import your AppModal here
import { useSelector } from 'react-redux';
import { showSuccess } from '../../services/toast';
import { RootState } from '../../store';
import { useCreateNewAppMutation, useDeleteAppMutation, useEditAppMutation, useGetAllAppsQuery } from '../../services/api';
import { useNavigate } from 'react-router-dom';

interface AppDetail {
  key: string;
  title: string;
  desc: string;
  status: string;
  _id: string; 
  createdAt: string;
}

const AppDetails = (): JSX.Element => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data,  isLoading:fetchLoading, refetch:refetchApps } = useGetAllAppsQuery(user?.id); 
  const [ deleteApp,{isLoading:delLoading} ] = useDeleteAppMutation(); 
  const [ ,{isLoading:createLoading} ] = useCreateNewAppMutation(); 
  const [ ,{isLoading:editLoading} ] = useEditAppMutation(); 
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [appToDelete, setAppToDelete] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedApp, setSelectedApp] = useState<AppDetail | null>(null); 
  const navigate = useNavigate();
  
  
  const showConfirmationModal = (appId: string) => {
    setAppToDelete(appId);
    setIsConfirmVisible(true);
  };

  const handleDeleteConfirm = async() => {
    if (appToDelete) {
     await deleteApp(appToDelete)
    showSuccess("App has been deleted successfully!.")
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
        <Button type="link" onClick={() => navigate(`/subscription/${record._id}`)}>
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
            onClick={() => showConfirmationModal(record._id)}
          />
        </>
      ),
    },
  ];



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
      <Table columns={columns} dataSource={data?.apps} loading={delLoading ?? createLoading ?? editLoading ?? fetchLoading } />

    
      <AppModal
        visible={isModalVisible}
        onClose={handleModalClose}
        initialData={selectedApp ? { title: selectedApp.title, desc: selectedApp.desc, status: selectedApp.status === 'active' } : undefined}
        appId={selectedApp?._id}
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
