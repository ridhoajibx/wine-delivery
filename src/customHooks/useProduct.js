import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const url = process.env.REACT_APP_WINE_URL

const useProduct = (identifier) => {
    let history = useHistory();
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getProduct = async() => {
            setLoading(true);
            try {
                let { data } = await axios.get(`${url}/${identifier}`)
                setProduct(data.value);
                setLoading(false);
            } catch ({response}) {
                console.log(response.data.message);
                setLoading(false);
                history.push('/');
            }
        }
        getProduct();
    }, [identifier, history]);

    return { product, setProduct, loading };
}

export default useProduct;
