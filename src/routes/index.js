import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Products from '../views/Products';
import Details from '../views/Details';
import Carts from '../views/Carts';
import NotFound from '../views/NotFound';

export default function index() {
    return (
        <BrowserRouter>

            <Switch>
                <Route exact path="/">
                    <Redirect to="/products" />
                </Route>
                <Route exact path="/products" component={Products} />
                <Route exact path="/products/:identifier" component={Details} />
                <Route exact path="/your-cart" component={Carts} />
                <Route exact exact path="*" render={() => {
                    return (
                        <NotFound />
                    )
                }} />
            </Switch>

        </BrowserRouter>
    )
}
