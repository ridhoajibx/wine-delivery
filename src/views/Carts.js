import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { ThemeContext } from '../App';
import App from '../layouts/App';

export default function Carts() {
    const { cartData, setCartData } = useContext(ThemeContext);

    const removeCartHandler = async (item) => {
        const cart = cartData;
        const findData = cart.find(x => x.id === item.id);
        try {
            const data = { ...findData }
            const findIndex = cart.findIndex(x => x.id === data.id)
            await setCartData([
                ...cart.slice(0, findIndex),
                ...cart.slice(findIndex + 1, cart.length)
            ]);
            await toast(`${findData.name} remove from cart list!`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } catch (error) {
            await toast.error(`🚀 ${error}`, {
                position: "top-right",
                autoClose: 3000,
            });
        }
    }

    return (
        <App title="Your Cart">
            <ToastContainer />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <div className="card">
                            <div className="card-header">
                                <span className="font-weight-bold">Your Cart</span>
                            </div>
                            <div className="card-body p-0">
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Image</th>
                                            <th>Wine</th>
                                            <th>Grape Varieties</th>
                                            <th>Year</th>
                                            <th>Qty</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartData.length > 0 ?
                                            cartData.map((cart, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <img src={cart.image} alt={cart.name} className="img-thumbnail img-table" />
                                                    </td>
                                                    <td>{cart.name}</td>
                                                    <td>{cart.grapeVarietes}</td>
                                                    <td>{cart.vintageYear}</td>
                                                    <td>{cart.total}</td>
                                                    <td>
                                                        <button onClick={() => removeCartHandler(cart)} className="btn btn-sm btn-danger">Delete</button>
                                                    </td>
                                                </tr>
                                            )) :
                                            <tr>
                                                <td colspan="4">You don't any products in your cart, go to <Link className="btn btn-sm btn-cream" to="/products">Products</Link> Page</td>
                                            </tr>
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </App>
    )
}
