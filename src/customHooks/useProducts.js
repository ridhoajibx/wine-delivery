import axios from 'axios';
import { useEffect, useState } from 'react'

function useProducts(page) {
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getProductList = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`https://zax5j10412.execute-api.ap-southeast-1.amazonaws.com/dev/api/product/list?page=${page}`)
                setProducts([...products, ...data.value.products]);
                setLoading(false);
            } catch (error) {
                setErrors(error.response.message);
                setLoading(false);
            }
        }
        getProductList()
    }, [page]);
    return { products, setProducts, errors, loading }
}

export default useProducts;
