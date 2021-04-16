import React, { useContext } from 'react';
import { Button, Form, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import Logo from '../../src/logo.png';
import { ThemeContext } from '../App'

const Header = () => {
    const { cartData } = useContext(ThemeContext);

    let history = useHistory();
    const goToHome = (e) => {
        e.stopPropagation()
        history.push('/');
    }
    const back = (e) => {
        e.stopPropagation()
        history.goBack();
    }

    return (
        <Navbar bg="dark" expand="md" variant="dark" className="py-2 shadow-sm">
            <div className="container-fluid">
                <div className="d-flex align-items-center text-white">
                    {history.location.pathname === "/" ?
                        <div className="nav-icons mr-5 d-none d-md-block">
                            <button onClick={goToHome} className="btn btn-sm btn-link text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                                </svg>
                            </button>
                        </div> :
                        <div className="nav-icons mr-5">
                            <button onClick={back} className="btn btn-sm btn-icons">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                                </svg>
                            </button>
                        </div>
                    }
                    <div className="d-flex align-items-center">
                        <img className="img-logo mr-1" src={Logo} alt="logo"/>
                        <NavLink to="/" className="navbar-brand">WINE.DELIVERY</NavLink>
                    </div>
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Form className="mx-auto my-1 position-relative">
                        <Form.Control className="form-search text-dark" placeholder="Search in Wine.Delivery" size="sm" type="text" />
                        <Button size='sm' type="submit" className="position-absolute t-0 r-0 text-cream text-decoration-none font-sm text-uppercase" variant="link">Search</Button>
                    </Form>
                    <Nav className="ml-auto font-sm">
                        <NavLink className="nav-link" to="/products">Products</NavLink>
                        <Nav.Link href="#signup">Sign up</Nav.Link>
                        <Nav.Link href="#login">Login</Nav.Link>
                        <NavLink to={`/cart`} className="nav-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
                                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                            </svg>
                            <div className="badge bg-cream badge-pill font-sm px-1 py-0">{ cartData.length }</div>
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

export default Header;
