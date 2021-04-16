import { createContext, useState } from 'react';
import RouterIndex from './routes';
import './App.css';

export const ThemeContext = createContext({
    cartData: [],
    setCartData: (val) => {},
})

function App() {
    const [cartData, setCartData] = useState([])
    return (
        <ThemeContext.Provider value={{ cartData, setCartData }}>
            <RouterIndex />
        </ThemeContext.Provider>
    );
}

export default App;
