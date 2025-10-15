import { toast } from 'react-toastify';

const toastOption = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
}

export const successToast = (message) => toast.success(message, toastOption)
export const errorToast = (message) => toast.error(message, toastOption)