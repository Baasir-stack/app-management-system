import { Popconfirm, Table } from "antd";
import { GrAdd } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { Wrapper } from "./style";
import { useState } from "react";
import AddCategoryModal from "./modal";
import { useDeleteCategoryMutation, useGetAllCategoriesQuery } from "../../../services/api";
import { showError, showSuccess } from "../../../services/toast";
import { AiFillEdit } from "react-icons/ai";
import EditCategoryModal from "./editModal";
import Button from "../../../component/button";
import TypoGraphy from "../../../component/typography";

const Categories = (): ReactNode => {
    const [open, setOpen] = useState(false)
    const { data, isLoading } = useGetAllCategoriesQuery()
    const [deleteCategory] = useDeleteCategoryMutation()
    const [record, setRecord] = useState<IKeyValue | null>(null)
    const [editOpen, setEditOpen] = useState(false)





    const columns = [
        {
            title: "Category Name",
            dataIndex: "categoryName",
            key: "categoryName",
            width: "90%"
        },
        {
            title: "Action",
            dataIndex: "Action",
            render: (_: any, record: IKeyValue) => (
                <>
                    <AiFillEdit
                        size={20}
                        style={{ marginRight: "10px", cursor: "pointer" }}
                        onClick={() => handleEdit(record)}
                    />

                    <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => handleDelete(record)}
                    >
                        <MdDelete size={20} style={{ cursor: "pointer" }} />
                    </Popconfirm>
                </>
            ),
        },
    ]

    const handleEdit = (record: IKeyValue) => {
        setRecord(record)
        setEditOpen(true)
    }
    const handleDelete = (record: IKeyValue) => {
        deleteCategory(record._id).unwrap()
            .then((fulfilled): void => {
                showSuccess(fulfilled?.message)
            })
            .catch((rejected) => {
                showError(rejected.data.message)
            })
    }


    return (
        <>

            <Wrapper>
                <TypoGraphy value="Categories" level={1} />
                <Button type="dashed" onClick={() => setOpen(true)}  > <GrAdd /> <span>Add new Category</span> </Button>
            </Wrapper>
            <Table
                columns={columns}
                dataSource={data?.categories}
                loading={isLoading}
            />
            <AddCategoryModal setOpen={setOpen} open={open} />
            <EditCategoryModal open={editOpen} setOpen={setEditOpen} record={record} setRecord={setRecord} />
        </>
    )
}

export default Categories