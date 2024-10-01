import { Form, Input, Modal } from "antd"
import { useForm } from "antd/es/form/Form"
import { useAddCategoryMutation } from "../../../services/api"
import { showError, showSuccess } from "../../../services/toast"

interface IAddProductModal {
    open: boolean,
    setOpen: (value: boolean) => void
}

const AddCategoryModal = ({ open, setOpen }: IAddProductModal): JSX.Element => {
    const [addCategory, { isLoading }] = useAddCategoryMutation()
    const [form] = useForm()


    const handleFormSubmit = (values: IKeyValue) => {
        addCategory(values).unwrap()
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

export default AddCategoryModal