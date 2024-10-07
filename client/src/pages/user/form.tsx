/* eslint-disable no-console */
import { Card } from 'antd';
import { useState } from 'react';
import ProfileForm from '../../component/profile-form';
import PasswordModal from '../../component/modals/password-modal';
import { useUpdateProfileMutation, useUpdatePasswordMutation, useGetProfileDetailsQuery } from '../../services/api'; 
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
  const [getAvatar, setGetAvatar] = useState<File | string>(""); 
  const [hasFormSubmit, setHasFormSubmit] = useState<boolean>(false); 
  // const { user } = useSelector((state: RootState) => state.auth);
  const { data:user, refetch:refetchUser } = useGetProfileDetailsQuery();  

  
  const [updateProfile,{isLoading:updateProfileLoader}] = useUpdateProfileMutation();
  const [updatePassword,{isLoading:updatePasswordLoader}] = useUpdatePasswordMutation();

  const handleFinish = async (values: ProfileFormValues) => {
    try {
      const { firstName, lastName } = values;

      const formData = new FormData()

      if( !firstName && !lastName && !getAvatar) return
      
      if (firstName) formData.append("firstName",firstName)
        if (lastName) formData.append("lastName",lastName)
      if(getAvatar) formData.append("avatar",getAvatar)
  
      await updateProfile( formData ).unwrap(); 
      showSuccess('Profile updated successfully!'); 
      await  refetchUser();
      if(hasFormSubmit) setHasFormSubmit(false)
      setHasFormSubmit(true)
      setIsEditing(false);


    } catch (error) {
      showError('Failed to update profile. Please try again.'); 
      console.error('Profile update error:', error);
    }
  };
  

  const handlePasswordChange = async ({currentPassword ,password, confirmPassword }: {currentPassword:string ,password: string; confirmPassword: string }) => {
    try {
      const response = await updatePassword({ currentPassword,password, confirmPassword }).unwrap(); 
       setPasswordModalVisible(false);
       console.log(response)
       showSuccess(`${response?.message}`); 
    } catch (error) {
      const { data } = error as ErrorResponse; // Use the defined interface
      showError(`${data?.message || 'An error occurred'}`);
      console.error('Password change error:', error);
    }
  };

  const initialValues = {
    firstName: user?.data.firstName || '',
    lastName: user?.data.lastName || '',
    email: user?.data.email || '',
    avatar: user?.data.avatar || '',
    role: user?.data.role || '',
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
          setGetAvatar = {setGetAvatar}
          hasFormSubmit = {hasFormSubmit}  
          loader={updateProfileLoader}
          updatePasswordLoader={updatePasswordLoader}
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
