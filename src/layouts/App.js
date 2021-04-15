import React from 'react';
import Header from '../components/Header'

export default function App({ children, title }) {
    Document.title = title;

    return (
        <div>
            <Header />
            <main>
                { children }
            </main>
        </div>
    )
}
