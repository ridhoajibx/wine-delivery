import { createContext, useState } from 'react';
import RouterIndex from './routes';
import './App.css';

export const ThemeContext = createContext({
    cartData: [],
    setCartData: (val) => {},
    markData: [],
    setMarkData: (val) => {},
})

function App() {
    const [cartData, setCartData] = useState([])
    const [markData, setMarkData] = useState([])
    return (
        <ThemeContext.Provider value={{ cartData, setCartData, markData, setMarkData }}>
            <RouterIndex />
        </ThemeContext.Provider>
    );
}

export default App;
