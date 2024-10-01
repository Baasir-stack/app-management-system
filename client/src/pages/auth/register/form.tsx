/* eslint-disable @typescript-eslint/no-unused-vars */

// import { UserOutlined, LockOutlined } from '@ant-design/icons'
// import { Link, useNavigate } from 'react-router-dom'
// import { validatePassword } from '../../../services/_utils'
// import Button from '../../../component/button'
// import { Form, Input, Select } from 'antd'
// import { useState } from 'react'
// import { useRegisterMutation } from '../../../services/api'
// import { showError, showSuccess } from '../../../services/toast'
// import { useForm } from 'antd/es/form/Form'

// const roleDataOptions = [
//     { value: 'VENDOR', label: 'Vendor' },
//     { value: 'CUSTOMER', label: 'Customer' },
// ]

// const RegisterForm = (): JSX.Element => {
//     const [register, { isLoading }] = useRegisterMutation()
//     const [form] = useForm()
//     const [file, setFile] = useState<IKeyValue | any>({})
//     const navigate = useNavigate()

//     const onFinish = (values: IKeyValue): void => {
//         const formData = new FormData()
//         Object.keys(values).forEach(key => {
//             if (key === 'profile_img') formData.append(key, file)
//             else formData.append(key, values[key])
//         })
//         register(formData).unwrap()
//             .then((fulfilled): void => {
//                 showSuccess(fulfilled.message)
//                 form.resetFields()
//                 navigate('/')
//             })
//             .catch((rejected) => {
//                 showError(rejected.data.message)
//             })

//     }
//     return (
//         <Form
//             initialValues={{ remember: true }}
//             onFinish={onFinish}
//             form={form}
//             disabled={isLoading}
//         >
//             <Form.Item
//                 name="firstName"
//                 label="First Name"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please input the first name',
//                     },
//                 ]}
//             >
//                 <Input />
//             </Form.Item>
//             <Form.Item
//                 name="lastName"
//                 label="Last Name"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please input the last name',
//                     },
//                 ]}
//             >
//                 <Input />
//             </Form.Item>
//             <Form.Item
//                 name="email"
//                 label="Email"
//                 rules={[
//                     {
//                         type: 'email',
//                         message: 'The input is not valid email',
//                     },
//                     {
//                         required: true,
//                         message: 'Please input your email',
//                     },
//                 ]}
//             >
//                 <Input
//                     prefix={
//                         <UserOutlined className="site-form-item-icon" />
//                     }
//                     placeholder="Email"
//                 />
//             </Form.Item>
//             <Form.Item
//                 name="password"
//                 label="Password"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please input the password',
//                     },
//                     { validator: validatePassword },
//                 ]}
//             >
//                 <Input
//                     prefix={
//                         <LockOutlined className="site-form-item-icon" />
//                     }
//                     type="password"
//                     placeholder="Password"
//                 />
//             </Form.Item>
//             <Form.Item
//                 name="profile_img"
//                 label="Image"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please select the Image',
//                     },
//                 ]}
//             >
//                 <input type="file" disabled={isLoading} onChange={(e: any) => setFile(e.target.files[0])} />
//             </Form.Item>
//             <Form.Item
//                 name="role"
//                 label="Role"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please select the role',
//                     },
//                 ]}
//             >
//                 <Select
//                     options={roleDataOptions}
//                 />
//             </Form.Item>
//             <Form.Item>
//                 <Button loading={isLoading} type="primary" htmlType="submit" block style={{ justifyContent: 'center' }} > Register </Button>
//             </Form.Item>
//             <span> Already have an account?</span> <Link to="/">Log in</Link>
//         </Form>
//     )
// }

// export default RegisterForm


/* eslint-disable react/no-unescaped-entities */
import { LockOutlined, UserOutlined, UploadOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Form, Input, Upload, Row, Col } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { showError, showSuccess } from '../../../services/toast'
import { useForm } from 'antd/es/form/Form'
import { useState } from 'react'
import { useRegisterMutation } from '../../../services/api'

const RegisterForm = (): JSX.Element => {
  const [form] = useForm()
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [register, { isLoading }] = useRegisterMutation()
    const navigate = useNavigate()


  const onFinish = (values: any): void => {
    const formData = new FormData()
    formData.append('firstName', values.firstName)
    formData.append('lastName', values.lastName)
    formData.append('email', values.email)
    formData.append('password', values.password)
    if (avatarFile) formData.append('avatar', avatarFile)

    // API call to register the user
    register(formData).unwrap()
      .then((fulfilled): void => {
        showSuccess(fulfilled.message)
        navigate('/app')
        form.resetFields()
      })
      .catch((rejected) => {
        showError(rejected.data.message)
      })
  }

  const handleAvatarChange = (info: any) => {
    const file = info.file.originFileObj
    setAvatarFile(file)
  }

  return (
<div
>
<Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      initialValues={{ remember: true }}
    >
      {/* Row 1: First Name and Last Name */}
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: 'Please input your first name!',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="First Name" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: 'Please input your last name!',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Last Name" />
          </Form.Item>
        </Col>
      </Row>

      {/* Row 2: Email and Password */}
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not a valid email!',
              },
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
        </Col>
      </Row>

      {/* Row 3: Avatar */}
      <Row>
        <Col xs={24}>
          <Form.Item
            label="Avatar"
            name="avatar"
          >
            <Upload
              beforeUpload={() => false}
              onChange={handleAvatarChange}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload Avatar</Button>
            </Upload>
          </Form.Item>
        </Col>
      </Row>

      {/* Submit Button */}
      <Row>
        <Col xs={24}>
          <Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit" block>
              Register
            </Button>
            <span >Already have an account? <Link to="/">Login</Link></span>
          </Form.Item>
        </Col>
      </Row>
    </Form>
</div>
    
  )
}

export default RegisterForm

