import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import ProductList from '../components/ProductList';
import useProducts from '../customHooks/useProducts';
import useScroll from '../customHooks/useScroll';
import App from '../layouts/App';

export default function Products() {
    const [page, setPage] = useState(1);
    const { products, loading, errors } = useProducts(page);
    const scrollPosition = useScroll();

    useEffect(() => {
        if (scrollPosition === document.body.offsetHeight - window.innerHeight) {
            setPage(page + 1);
        }
    }, [scrollPosition, page]);
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
                
                <div className="row my-4 justify-content-center">

                    {loading &&
                        <div>
                            <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                            <Spinner className="mx-2" as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                            <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                        </div>
                    }
                </div>
            </div>
        </App>
    )
}
