import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import Products from '../views/Products';
import Details from '../views/Details';
import Carts from '../views/Carts';

export default function index() {
    return (
        <BrowserRouter>

            <Switch>
                <Route exact path="/" component={ Home } />
                <Route exact path="/products" component={ Products } />
                <Route path="/products/:identifier" component={ Details } />
                <Route path="/your-cart" component={ Carts } />
            </Switch>
            
        </BrowserRouter>
    )
}
