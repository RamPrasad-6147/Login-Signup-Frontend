import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToastMessage() {

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      pauseOnHover
      draggable
      theme="colored"
    />
  );
}

export default ToastMessage;