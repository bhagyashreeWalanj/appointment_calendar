import { toast } from 'react-toastify'

const Notification = (type: string, message: string, callBackFn: void) => {
  switch (type) {
    case 'info':
      toast.info(message, { onClose: () => callBackFn })
      break
    case 'success':
      toast.success(message, { onClose: () => callBackFn })
      break
    case 'warning':
      toast.warning(message, { onClose: () => callBackFn })
      break
    case 'error':
      toast.error(message, { onClose: () => callBackFn })
      break
    default:
      toast.info(message, { onClose: () => callBackFn })
      break
  }
}

export default Notification
