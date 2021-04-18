import axios from 'axios';
import { useEffect, useState } from 'react'

const url = process.env.REACT_APP_WINE_URL

function useProducts(page) {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0)
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getProductList = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`${url}/list?page=${page}`)
                setProducts(p => ([...p, ...data.value.products]));
                setTotal(data.value.totalCount);
                setLoading(false);
            } catch ({ response }) {
                setErrors(response.data.message);
                setLoading(false);
            }
        }
        getProductList()
    }, [page]);
    return { products, setProducts, total, errors, loading }
}

export default useProducts;
