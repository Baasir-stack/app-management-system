import { useState } from 'react'
import AppCard from '../../../component/card'
import Splash from '../../splash'
import { Wrapper } from './styles'
import { Col, Row } from 'antd'
import { appApis, useGetAllProductsQuery } from '../../../services/api'
import ProductSearch from './productSearch'
import CategorySearch from './categorySearch'
import { useDispatch } from 'react-redux'
import Button from '../../../component/button'


const Products = (): JSX.Element => {
    const [page, setPage] = useState<number | undefined | any>(1);
    const [pageSize] = useState<number | undefined | any>(10);
    const { data: productsData, isLoading, isFetching, refetch } = useGetAllProductsQuery({ page, pageSize })
    const [cards, setCards] = useState<IProducts | any>([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const loadMore = (): void => {
        setPage((prev: number) => prev + 1)
    }

    const handleSearch = (searchData: IProductsByQuery): void => {
        setLoading(true)
        if (searchData?.products?.length) setCards(searchData?.products)
        else setCards(productsData?.products)

        // appApis.util.resetApiStatet
        setLoading(false)
    }

    const handleReFetchProducts = () => {
        setLoading(true)
        dispatch(appApis.util.resetApiState())
        setPage(1)
        refetch().unwrap()
            .then((res) => {
                setCards(res?.products)
                setLoading(false)
            })
    }


    const handleFunctionCalling = () => {
        if (cards?.length) return cards
        else return productsData?.products
    }


    if (isFetching || loading) return <Splash />



    return (

        <Wrapper>
            <div style={{ width: '100%' }}>
                <ProductSearch handleSearch={handleSearch} handleReFetchProducts={handleReFetchProducts} />
                <CategorySearch handleSearch={handleSearch} handleReFetchProducts={handleReFetchProducts} />
                <Row gutter={50}>
                    {handleFunctionCalling()?.map((card: IProducts, index: number) => (
                        <Col key={index} span={4.5} style={{ marginBottom: '1rem' }}>
                            <AppCard data={card} />
                        </Col>
                    ))}
                </Row>
                {(productsData?.metaData?.count !== productsData?.products?.length) && (!cards?.length) && (
                    <Button loading={isLoading} onClick={loadMore} style={{ display: 'block', margin: '1rem auto' }} > Load More </Button>
                )}
            </div>
        </Wrapper>
    )
}

export default Products
