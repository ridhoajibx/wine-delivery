import axios from 'axios';
import { useEffect, useState } from 'react';

const useProduct = (identifier) => {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getProduct = async() => {
            setLoading(true);
            try {
                let { data } = await axios.get(`https://zax5j10412.execute-api.ap-southeast-1.amazonaws.com/dev/api/product/${identifier}`)
                setProduct(data.value);
                setLoading(false);
            } catch (error) {
                console.log(error.responses);
                setLoading(false);
            }
        }
        getProduct();
    }, [identifier]);

    return { product, setProduct, loading };
}

export default useProduct;
