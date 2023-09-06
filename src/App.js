import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import NavBar from "./componenets/NavBar";
import Cart from "./componenets/Cart";
import Home from "./componenets/Home";
import NotFound from "./componenets/NotFound";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
