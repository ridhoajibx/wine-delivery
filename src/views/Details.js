import { useParams } from 'react-router'
import { Breadcrumb, Spinner } from 'react-bootstrap';
import useProduct from '../customHooks/useProduct';
import App from '../layouts/App';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { ThemeContext } from '../App';
import { useContext, useEffect, useState } from 'react';

export default function Details() {
    const { identifier } = useParams();
    const { product, loading } = useProduct(identifier);
    const { cartData, setCartData, markData, setMarkData } = useContext(ThemeContext);

    const addToCart = async (item) => {
        const cart = cartData;
        const findData = cart.find(x => x.id === item.id);

        if (item.qty === 0) {
            toast.error(`${item.name} has sold out!`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } else {
            try {
                if (findData) {
                    if (findData.qty <= findData.total) {
                        await toast.error(`${findData.name} has sold out!`, {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                    } else {
                        const data = { ...findData, total: findData.total + 1 }
                        const findIndex = cart.findIndex(x => x.id === data.id)
                        cart.splice(findIndex, 1, data);
                        await setCartData(cart);
                        await toast(`${findData.name} is added to cart!`, {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                    }
                } else {
                    const data = [...cartData, {
                        ...item,
                        total: 1
                    }]
                    await setCartData(data);
                    await toast(`${item.name} is added to cart!`, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            } catch (error) {
                toast.error(`added ${item.name} failed!`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        }
    }

    const markProduct = async (item) => {
        const mark = markData;
        const findData = mark.find(x => x.id === item.id);

        if (findData) {
            const data = { ...findData }
            const findIndex = mark.findIndex(x => x.id === data.id)
            mark.splice(findIndex, 1);
            await setCartData(mark);
            await toast(`${findData.name} is unmarked!`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } else {
            const data = [...markData, {
                ...item,
                mark: true
            }]
            await setMarkData(data);
            await toast(`${item.name} is marked!`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    console.log(markData)
    return (
        <App title={product.name}>
            <ToastContainer />
            <div className="container">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/products">
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
                            {loading ?
                                <div className="d-flex align-items-center justify-content-center min-vh-100">
                                    <Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>
                                </div> :
                                <div className="row">
                                    <div className="col-lg-3">
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
                                                    <button onClick={() => addToCart(product)} className="btn btn-sm btn-cream px-4 px-lg-4">Add to cart</button>
                                                    <button onClick={() => markProduct(product)} className="btn btn-sm btn-link text-cream p-0">
                                                        {!markData.length ?
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-bookmark" viewBox="0 0 16 16">
                                                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                                                            </svg> :
                                                            markData.find(p => p.id === product.id) ?
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-bookmark-check-fill" viewBox="0 0 16 16">
                                                                    <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                                                                </svg> :
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-bookmark" viewBox="0 0 16 16">
                                                                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                                                                </svg>
                                                        }
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
                            }
                        </div>
                    </div>
                </div>
            </div>
        </App>
    )
}
