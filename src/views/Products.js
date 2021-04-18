import React, { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import ProductList from '../components/ProductList';
import useProducts from '../customHooks/useProducts';
import App from '../layouts/App';
import useScroll from '../customHooks/useScroll';

export default function Products() {
    const [page, setPage] = useState(1);
    const { products, loading, errors, total } = useProducts(page);
    const scrollPosition = useScroll();

    const loadHandler = () => {
        setPage(page + 1);
    }

    useEffect(() => {
        if (products.length !== total) {
            if (scrollPosition >= document.body.offsetHeight - window.innerHeight) {
                setPage(page + 1);
            }
        }
    }, [products, total, scrollPosition, page])

    return (
        <App>
            <ToastContainer />
            {errors &&
                <div className="d-flex min-vh-100">
                    <p className="m-auto">{errors}</p>
                </div>
            }
            <div className="container mt-5">
                <div className="row">
                    {
                        products && products.map((product, index) => (
                            <div className="col-lg-4" key={index}>
                                <ProductList
                                    product={product}
                                />
                            </div>
                        ))
                    }
                </div>

                <div className="row my-4 justify-content-center align-items-center">

                    {loading ?
                        <div className="mx-auto my-auto">
                            <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                            <Spinner className="mx-2" as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                            <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                        </div> : products.length !== total ?
                            <button onClick={loadHandler} className="btn btn-sm btn-cream">Load more...</button> :
                            <span>
                                <strong>Yay! You have seen it all</strong>
                            </span>
                    }


                </div>
            </div>
        </App>
    )
}
