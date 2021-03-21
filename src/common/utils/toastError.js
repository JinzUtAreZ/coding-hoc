import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const notifyToastError = (message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
  });
};

export default notifyToastError;
