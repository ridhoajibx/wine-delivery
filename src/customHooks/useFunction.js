import { useContext } from 'react';
import { toast } from 'react-toastify';
import { ThemeContext } from '../App';

const useFunction = () => {
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

    const markProduct = async(item) => {
        const mark = markData;
        const findData = mark.find(x => x.id === item.id);
        if (findData) {
            const data = { ...findData }
            const findIndex = mark.findIndex(x => x.id === data.id)
            await setMarkData([
                ...mark.slice(0, findIndex),
                ...mark.slice(findIndex + 1, mark.length)
            ]);
            await toast(`${findData.name} remove from wish list!`, {
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
                ...item
            }]
            await setMarkData(data);
            await toast(`${item.name} is added to wish list!`, {
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
    return { addToCart, markProduct };
}

export default useFunction;
