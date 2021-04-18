import axios from 'axios';
import { useEffect, useState } from 'react';

const url = process.env.REACT_APP_WINE_URL

const useProduct = (identifier) => {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getProduct = async() => {
            setLoading(true);
            try {
                let { data } = await axios.get(`${url}/${identifier}`)
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
