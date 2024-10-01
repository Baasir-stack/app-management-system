import { Form, Input, Modal } from "antd"
import { useForm } from "antd/es/form/Form"
import { useUpdateCategoryMutation } from "../../../services/api"
import { useEffect } from "react"
import { showError, showSuccess } from "../../../services/toast"

interface IEditCategoryModal {
    open: boolean
    setOpen: (value: boolean) => void
    record: IKeyValue | null
    setRecord?: (value: IKeyValue) => void
}

const EditCategoryModal = ({ open, setOpen, record }: IEditCategoryModal): JSX.Element => {
    const [updateCategory, { isLoading }] = useUpdateCategoryMutation()
    const [form] = useForm()

    useEffect(() => {
        form.setFieldsValue({ ...record })
    }, [record])

    const handleFormSubmit = (values: IKeyValue) => {
        const id = record!._id
        updateCategory({ id, values }).unwrap()
            .then((fulfilled: any): void => {
                showSuccess(fulfilled?.message)
                form.resetFields()
                setOpen(false)
            })
            .catch((rejected) => {
                showError(rejected?.data?.message)
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
                    name="categoryName"
                    label="Category Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

            </Form >
        </Modal>
    )
}

export default EditCategoryModal