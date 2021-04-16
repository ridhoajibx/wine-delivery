import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios';
import App from '../layouts/App'
import { Breadcrumb } from 'react-bootstrap';

export default function Details() {
    const { identifier } = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const getProduct = async () => {
            const { data } = await axios.get(`https://zax5j10412.execute-api.ap-southeast-1.amazonaws.com/dev/api/product/${identifier}`)
            console.log(data)
            setProduct(data.value);
        }
        getProduct()
    }, [identifier])

    return (
        <App title={product.name}>
            <div className="container">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/">
                        Products
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{product.grapeVarieties}</Breadcrumb.Item>
                    <Breadcrumb.Item>{product.country}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card border-0 mb-3">
                            <div className="row">
                                <div className="col-lg-3">
                                    {/* https://s15.postimg.cc/temvv7u4r/recipe.jpg */}
                                    <div className="card-img-body">
                                        <img src={product.image} className="card-image mx-auto" alt={product.name} />
                                    </div>
                                </div>
                                <div className="col-lg-9">
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <div className="card-title font-lg text-cream">{product.name}</div>
                                            <div className="card-text text-mute">{product.grapeVarieties} - {!product.vintageYear ? 'Non-Vintages' : product.vintageYear}</div>
                                            <div className="card-text text-mute">{product.country}</div>
                                        </div>

                                        <div className="d-md-flex d-block justify-content-between align-items-center py-2">
                                            <div className="card-text">S$ {product.price}</div>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <button className="btn btn-sm btn-cream px-4 px-lg-4">Add to cart</button>
                                                <button className="btn btn-sm btn-link text-cream p-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-bookmark" viewBox="0 0 16 16">
                                                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="row mt-4 mb-4">
                                            <div className="col-lg-3">
                                                <div className="font-sm text-cream">Region</div>
                                                <div className="card-text">
                                                    {product.region}
                                                </div>
                                            </div>
                                            <div className="col-lg-3">
                                                <div className="font-sm text-cream">Producer</div>
                                                <div className="card-text">
                                                    {product.producer}
                                                </div>
                                            </div>
                                            <div className="col-lg-3">
                                                <div className="font-sm text-cream">Bottle</div>
                                                <div className="card-text">
                                                    {product.bottleSize}
                                                </div>
                                            </div>
                                            <div className="col-lg-3">
                                                <div className="font-sm text-cream">Alcohol</div>
                                                <div className="card-text">
                                                    {product.alcohol}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-4 mb-4">
                                            <div className="col-12">
                                                <div className="font-sm text-cream">Description</div>
                                                <div className="card-text">
                                                    {product.description}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-4 mb-4">
                                            <div className="col-12">
                                                <div className="font-sm text-cream">Tasting Notes</div>
                                                <div className="card-text" dangerouslySetInnerHTML={{ __html: product.tastingNotes }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </App>
    )
}
