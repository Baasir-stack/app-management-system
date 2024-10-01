import { Popconfirm, Table } from "antd"
import { AiFillEdit } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { Wrapper } from "./style";
import Button from "../../../component/button";
import AddProductModal from "./modal";
import { useEffect, useState } from "react";
import { useDeleteProductMutation, useGetUserProductsQuery } from "../../../services/api";
import EditProductModal from "./editModal";
import { showError, showSuccess } from "../../../services/toast";
import TypoGraphy from "../../../component/typography";





const VendorProducts = (): ReactNode => {
    const [open, setOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [page, setPage] = useState<number | undefined>(1);
    const [pageSize, setPageSize] = useState<number | undefined>(10);
    const [totalCount, setTotalCount] = useState<number>(0)
    const [record, setRecord] = useState<IKeyValue | null>(null)

    const { data: productsData, isLoading } = useGetUserProductsQuery({ page, pageSize })
    const [deleteProduct] = useDeleteProductMutation()

    const handleCategoryName = (categoryName: string) => categoryName

    const columns: IKeyValue[] = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Description",
            dataIndex: "desc",
            key: "desc",
        },
        {
            title: "Image",
            dataIndex: "imgSrc",
            key: "imgSrc",
            render: (_: any, record: { imgSrc: string }) => {
                return (
                    <div style={{ width: 23, height: 23 }} > <img width="100%" src={record.imgSrc} alt="" /></div>
                )
            }
        },
        {
            title: "Category",
            dataIndex: 'category',
            render: (record: { categoryName: string }) => handleCategoryName(record?.categoryName),
            key: "category",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
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

    useEffect(() => {
        setTotalCount(productsData?.metaData?.count)
    }, [productsData])


    const handleEdit = (record: IKeyValue) => {
        setRecord(record)
        setEditOpen(true)
    }

    const handleDelete = (record: IKeyValue) => {
        const _id = record._id
        deleteProduct(_id).unwrap().then((fulfilled: any): void => {
            showSuccess(fulfilled.message)
        })
            .catch((rejected: any) => {
                showError(rejected.data.message)
            })
    }

    const handlePagination = () => {
        return {
            total: totalCount,
            showSizeChanger: true,
            defaultCurrent: page,
            defaultPageSize: pageSize
        }
    }

    return (
        <>
            <Wrapper>
                <TypoGraphy value="Products" level={1} />
                <Button type="dashed" onClick={() => setOpen(true)} > <GrAdd /> <span>Add new product</span> </Button>
            </Wrapper>
            <Table
                columns={columns}
                dataSource={productsData?.products}
                loading={isLoading}
                pagination={handlePagination()}
                onChange={(pagination) => { setPage(pagination.current); setPageSize(pagination.pageSize) }} />
            <AddProductModal open={open} setOpen={setOpen} />
            <EditProductModal open={editOpen} setOpen={setEditOpen} record={record} setRecord={setRecord} />
        </>

    )
}

export default VendorProducts