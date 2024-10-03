/* eslint-disable react/prop-types */
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {  useState } from 'react';

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string; 
  role: string;
}

interface ProfileFormProps {
  initialValues: ProfileFormValues; 
  onFinish: (values: ProfileFormValues) => void; 
  onPasswordClick: () => void;
  isEditing: boolean; 
  onEditClick: () => void; 
}

const ProfileForm: React.FC<ProfileFormProps> = ({ initialValues, onFinish, onPasswordClick, isEditing, onEditClick }) => {
  const [form] = Form.useForm();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleAvatarChange = async (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string); 
      form.setFieldsValue({ avatar: reader.result }); 
    };
    reader.readAsDataURL(file);
    setUploadedFile(file); 
    return false; 
  };

  return (
    <Form form={form} layout="vertical" initialValues={initialValues} onFinish={onFinish} style={{ marginTop: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            overflow: 'hidden',
            marginRight: '16px',
          }}
        >
          <img
            src={avatarPreview || initialValues.avatar} 
            alt="Avatar"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <Button type="default" onClick={onEditClick}>
          Edit
        </Button>
      </div>

      <Form.Item 
        label="First Name" 
        name="firstName" 
        rules={[{ required: true, message: 'Please enter your first name' }]} 
        style={{ display: isEditing ? 'block' : 'none' }}
      >
        <Input placeholder="Enter your first name" />
      </Form.Item>

      <Form.Item 
        label="Last Name" 
        name="lastName" 
        rules={[{ required: true, message: 'Please enter your last name' }]} 
        style={{ display: isEditing ? 'block' : 'none' }}
      >
        <Input placeholder="Enter your last name" />
      </Form.Item>

      <Form.Item label="Email" name="email">
        <Input placeholder="Email" disabled />
      </Form.Item>

      <Form.Item label="Avatar" style={{ display: isEditing ? 'block' : 'none' }}>
        <Upload 
          beforeUpload={(file) => {
            handleAvatarChange(file);
            return false; 
          }} 
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Upload Avatar</Button>
        </Upload>
        {uploadedFile && <span style={{ marginLeft: '8px' }}>{uploadedFile.name}</span>} 
      </Form.Item>

      <Form.Item label="Password">
        <Input.Password
          placeholder="********"
          onClick={onPasswordClick}
          disabled
          style={{ cursor: 'pointer' }}
        />
        <Button type="link" onClick={onPasswordClick}>
          Change Password
        </Button>
      </Form.Item>

      {isEditing && (
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Update Profile
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default ProfileForm;
