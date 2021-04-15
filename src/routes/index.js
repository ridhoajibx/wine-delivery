import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Details from '../views/Details';
import Home from '../views/Home';

export default function index() {
    return (
        <BrowserRouter>

            <Switch>
                <Route exact path="/" component={ Home } />
                <Route path="/products/:identifier" component={ Details } />
            </Switch>
            
        </BrowserRouter>
    )
}
