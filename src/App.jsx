import { useEffect, useState } from "react";
import "./App.css";
import Categories from "./components/Categories/Categories";
import Products from "./components/Products/Products";
import StoreContext from "./hook/StoreContext";
import Cart from "./components/Carts/Cart";

function App() {
  const [filter, setFilter] = useState("");

  return (
    <div className="relative flex justify-between">
      <StoreContext.Provider value={{ filter, setFilter }}>
        <Categories />
        <Products />
        <Cart />
      </StoreContext.Provider>
    </div>
  );
}

export default App;
