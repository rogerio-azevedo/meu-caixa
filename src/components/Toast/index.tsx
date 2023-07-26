import { toast } from 'react-toastify'

interface ToastPros {
  isSuccessToast: boolean
  message: string | (() => JSX.Element)
  time?: number
}

export const Toast = ({ isSuccessToast, message, time }: ToastPros) => {
  return isSuccessToast
    ? toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: time ? time : false,
        className: 'toast-message-success',
        theme: 'colored',
      })
    : toast.warning(message, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        className: 'toast-message-error',
        theme: 'colored',
        autoClose: time ? time : false,
      })
}
