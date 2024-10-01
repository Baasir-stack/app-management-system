import Search from 'antd/es/input/Search'
import { ChangeEvent, useEffect, useState } from 'react'
import { useGetProductsBySearchMutation } from '../../../services/api'
import useDebounce from '../../../services/debounce.hook';
import { showError } from '../../../services/toast';
import { CloseOutlined } from '@ant-design/icons';



const ProductSearch = ({ handleSearch, handleReFetchProducts }: ISearch): JSX.Element => {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [searchData] = useGetProductsBySearchMutation()

    useEffect(() => {
        if (debouncedSearchTerm) {
            searchData({ keyword: debouncedSearchTerm, isCategory: false }).unwrap()
                .then((fulfilled) => {
                    handleSearch(fulfilled)
                })
                .catch((rejected) => {
                    showError(rejected.data.message)
                })
        }

    }, [debouncedSearchTerm]);

    const handleFieldClear = () => {
        handleReFetchProducts!()
    }

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    return (
        <Search
            allowClear={{ clearIcon: <CloseOutlined onClick={handleFieldClear} /> }}
            size='large'
            value={searchTerm}
            style={{ width: '20%', marginBottom: '2rem' }}
            placeholder="Search by Name or Category"
            onChange={handleNameChange} />
    )
}

export default ProductSearch