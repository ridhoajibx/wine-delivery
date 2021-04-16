import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import useProducts from '../customHooks/useProducts';
import App from '../layouts/App'

export default function Home() {
    const [page, setPage] = useState(1);
    const { products, setProducts, loading, errors } = useProducts(page);

    const handleLoadMore = () => {
        setPage(page + 1);
    }

    return (
        <App>
            <div className="container mt-5">
                <div className="row">
                    {
                        products && products.map((product, index) => (
                            <div className="col-lg-4" key={index}>
                                <Product 
                                    product={product}
                                />
                            </div>
                        ))
                    }
                </div>
                <div className="row my-4 justify-content-center">
                    {errors && 'errors...'}

                    {loading ?
                        <button onClick={handleLoadMore} className="btn btn-sm btn-cream" disable>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Loading...
                        </button> :
                        <button onClick={handleLoadMore} className="btn btn-sm btn-cream" >
                            Load More ...
                        </button>
                    }
                </div>
            </div>
        </App>
    )
}