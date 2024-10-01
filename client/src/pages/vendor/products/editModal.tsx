import { Form, Input, Modal, Select } from "antd"
import { useForm } from "antd/es/form/Form"
import { useGetCategoriesQuery, useUpdateProductMutation } from "../../../services/api"
import { useEffect, useState } from "react"
import { showError, showSuccess } from "../../../services/toast"

interface IEditProductModal {
    open: boolean
    setOpen: (value: boolean) => void
    record: IKeyValue | null
    setRecord?: (value: IKeyValue) => void
}

const EditProductModal = ({ open, setOpen, record }: IEditProductModal): JSX.Element => {
    const [updateProduct, { isLoading }] = useUpdateProductMutation()
    const { data: categoryData } = useGetCategoriesQuery()
    const [file, setFile] = useState<IKeyValue | any>({})
    const [form] = useForm()

    useEffect(() => {
        form.setFieldsValue({ ...record })
    }, [record])

    const handleFormSubmit = (values: IKeyValue) => {
        const formData = new FormData()
        const id = record!._id
        Object.keys(values).forEach(key => {
            if (key === 'product_img') formData.append(key, file)
            else formData.append(key, values[key])
        })
        updateProduct({ id, formData }).unwrap()
            .then((fulfilled: any): void => {
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
        <Modal onOk={handleModalSubmit} confirmLoading={isLoading} okText="Update" open={open} title="Update the Product" onCancel={() => setOpen(false)}>
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

export default EditProductModal