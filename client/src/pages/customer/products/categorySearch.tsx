import { Select } from 'antd'
import React from 'react'
import { useGetCategoriesQuery, useGetProductsBySearchMutation } from '../../../services/api'
import { showError } from '../../../services/toast'
import { CloseOutlined } from '@ant-design/icons'


const CategorySearch = ({ handleSearch, handleReFetchProducts }: ISearch): JSX.Element => {
  const { data: categoryData } = useGetCategoriesQuery()
  const [searchData] = useGetProductsBySearchMutation()
  const handleChange = (value: string) => {
    if (!value) handleReFetchProducts!()
    else {
      searchData({ keyword: value, isCategory: true }).unwrap()
        .then((fulfilled) => {
          handleSearch(fulfilled)
        })
        .catch((rejected) => {
          showError(rejected.data.message)
        })
    }
  }


  return (
    <Select
      placeholder="Search By Category"
      size='large'
      allowClear={{ clearIcon: <CloseOutlined /> }}
      options={categoryData?.categories?.map((it: ICategory) => ({ label: it.categoryName, value: it._id }))}
      onChange={handleChange}
    />
  )
}

export default CategorySearch