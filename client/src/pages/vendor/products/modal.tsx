import { Form, Input, Modal, Select } from "antd"
import { useForm } from "antd/es/form/Form"
import { useAddProductMutation, useGetCategoriesQuery } from "../../../services/api"
import { useState } from "react"
import { showError, showSuccess } from "../../../services/toast"

interface IAddProductModal {
    open: boolean,
    setOpen: (value: boolean) => void
}

const AddProductModal = ({ open, setOpen }: IAddProductModal): JSX.Element => {
    const [addProduct, { isLoading }] = useAddProductMutation()
    const { data: categoryData } = useGetCategoriesQuery()
    const [file, setFile] = useState<IKeyValue | any>({})
    const [form] = useForm()


    const handleFormSubmit = (values: IKeyValue) => {
        const formData = new FormData()
        Object.keys(values).forEach(key => {
            if (key === 'product_img') formData.append(key, file)
            else formData.append(key, values[key])
        })
        addProduct(formData).unwrap()
            .then((fulfilled): void => {
                showSuccess(fulfilled.message)
                form.resetFields()
                setOpen(false)
            })
            .catch((rejected) => {
                showError(rejected.data.message)
            })

    }

    const handleModalSubmit: any = (): void => {
        form
            .validateFields()
            .then((values: IKeyValue) => handleFormSubmit(values))
            .catch(err => console.log(err))
    }

    return (
        <Modal onOk={handleModalSubmit} confirmLoading={isLoading} okText="Create" open={open} title="Add New Product" onCancel={() => setOpen(false)}>
            <Form
                form={form}
                initialValues={{ remember: true }}
                disabled={isLoading}
            >
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="desc"
                    label="Description"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the description',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="product_img"
                    label="Image"
                    rules={[
                        {
                            required: true,
                            message: 'Please select the Image',
                        },
                    ]}
                >
                    <input type="file" disabled={isLoading} onChange={(e: any) => setFile(e.target.files[0])} />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Price"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the Price',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="category"
                    label="Category"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the Category',
                        },
                    ]}
                >
                    <Select options={categoryData?.categories?.map((it: ICategory) => ({ label: it.categoryName, value: it._id }))} />
                </Form.Item>
            </Form >
        </Modal>
    )
}

export default AddProductModal