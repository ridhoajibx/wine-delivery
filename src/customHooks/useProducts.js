import axios from 'axios';
import { useEffect, useState } from 'react'

function useProducts(page) {
    const [products, setProducts] = useState([]);
    const [totalPage, setTotalPage] = useState(0)
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getProductList = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`https://zax5j10412.execute-api.ap-southeast-1.amazonaws.com/dev/api/product/list?page=${page}`)
                setProducts(p => ([...p, ...data.value.products]));
                setTotalPage(data.value.totalCount);
                setLoading(false);
            } catch ({ response }) {
                setErrors(response);
                setLoading(false);
            }
        }
        getProductList()
    }, [page]);
    return { products, setProducts, totalPage, errors, loading }
}

export default useProducts;
