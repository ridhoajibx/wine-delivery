import { toast } from 'react-toastify';

export const addToCart = (item) => toast.dark(`${item} is added to cart!`, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});
export const markProduct = (item) => toast.dark(`${item} is marked!`, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});
