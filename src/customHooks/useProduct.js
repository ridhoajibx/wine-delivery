import axios from 'axios';
import { useEffect, useState } from 'react';

const useProduct = (identifier) => {
    const [product, setProduct] = useState([])

    useEffect(() => {
        const getProduct = async() => {
            try {
                let { data } = await axios.get(`https://zax5j10412.execute-api.ap-southeast-1.amazonaws.com/dev/api/product/${identifier}`)
                setProduct(data.value);
            } catch (error) {
                console.log(error.responses);
            }
        }
        getProduct();
    }, [identifier]);

    return { product, setProduct };
}

export default useProduct;
