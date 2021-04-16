import Header from '../components/Header'

export default function App({ children, title }) {
    document.title = title || "Wine Delivery";

    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
            <div className="bg-light mt-5 py-4 border-top">
                <div className="container">
                    Wine Delivery&trade; 2021
                </div>
            </div>
        </div>
    )
}
