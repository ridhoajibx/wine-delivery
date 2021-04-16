import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import useProducts from '../customHooks/useProducts';
import App from '../layouts/App'

export default function Home() {
    const [page, setPage] = useState(1);
    const { products, setProducts, loading, errors } = useProducts(page);

    const handleLoadMore = () => {
        setPage(page + 1);
    }

    return (
        <App title="Home">
            <div className="container mt-5">
                <div className="row">
                    {
                        products && products.map((product, index) => (
                            <div className="col-lg-4" key={index}>
                                <div className="card border-0 mb-3" style={{ maxWidth: '540px' }}>
                                    <div className="row no-gutters">
                                        <div className="col-4">
                                            <img src={product.image} className="card-image" alt="..." />
                                        </div>
                                        <div className="col-8">
                                            <div className="card-body">
                                                <div style={{ minHeight: '150px' }}>
                                                    <Link to={`/products/${product.id}`} className="card-title text-decoration-none font-lg text-cream">{product.name}</Link>
                                                    <div className="card-text">{product.grapeVarietes}</div>
                                                    <div className="card-text">{product.country}</div>
                                                </div>
                                                <div className="card-text mb-2">S$ {product.price}</div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <button className="btn btn-sm btn-cream px-4 px-lg-4">Add to cart</button>
                                                    <button className="btn btn-sm btn-link text-cream p-0">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-bookmark" viewBox="0 0 16 16">
                                                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                { loading && 'loading...' }
                { errors && 'errors...' }
                <div className="row my-4 justify-content-center">
                    <button className="btn btn-sm btn-cream" onClick={handleLoadMore}>Load More...</button>
                </div>
            </div>
        </App>
    )
}
