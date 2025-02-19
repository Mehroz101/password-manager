import { toast, ToastOptions, ToastPosition, Theme } from "react-toastify";

interface Options extends ToastOptions {
  position: ToastPosition;
  theme: Theme;
}

export const notify = ({
  type,
  message,
}: {
  type: string;
  message: string;
}): void => {
  const options: Options = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "info":
      toast.info(message, options);
      break;
    case "warning":
      toast.warn(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    default:
      toast(message, options); // General notification
      break;
  }
};
