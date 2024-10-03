/* eslint-disable no-console */
import { Card } from 'antd';
import { useState } from 'react';
import ProfileForm from '../../component/profile-form';
import PasswordModal from '../../component/modals/password-modal';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useUpdateProfileMutation, useUpdatePasswordMutation } from '../../services/api'; 
import { showSuccess, showError } from '../../services/toast';

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string; 
  avatar: string;
  role: string; 
}

const UserPage = (): JSX.Element => {
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [updateProfile] = useUpdateProfileMutation();
  const [updatePassword] = useUpdatePasswordMutation();

  const handleFinish = async (values: ProfileFormValues) => {
    try {
      
      const { firstName, lastName, avatar } = values;
      const updatedProfileData = { firstName, lastName, avatar };
  
      const response = await updateProfile({ updatedProfileData }).unwrap(); 
      showSuccess('Profile updated successfully!'); 
      console.log('Profile updated:', response);
      setIsEditing(false);
    } catch (error) {
      showError('Failed to update profile. Please try again.'); 
      console.error('Profile update error:', error);
    }
  };
  

  const handlePasswordChange = async ({ password, confirmPassword }: { password: string; confirmPassword: string }) => {
    try {
      const response = await updatePassword({ password, confirmPassword }).unwrap(); 
      showSuccess('Password changed successfully!'); 
      console.log('Password change submitted:', response);
      setPasswordModalVisible(false);
    } catch (error) {
      showError('Failed to change password. Please try again.'); 
      console.error('Password change error:', error);
    }
  };

  const initialValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
    role: user?.role || '',
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev); 
  };

  return (
    <>
      <Card
        title="Profile Details"
        bordered={true}
        style={{
          borderRadius: '12px',
          maxWidth: '600px',
          margin: '0 auto',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      >
        <ProfileForm
          initialValues={initialValues}
          onFinish={handleFinish}
          onPasswordClick={() => setPasswordModalVisible(true)}
          isEditing={isEditing}
          onEditClick={toggleEdit} 
        />
      </Card>

      <PasswordModal
        visible={isPasswordModalVisible}
        onClose={() => setPasswordModalVisible(false)}
        onSubmit={handlePasswordChange}
      />
    </>
  );
};

export default UserPage;
