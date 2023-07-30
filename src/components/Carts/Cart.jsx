import { useState } from "react";
import { FaShoppingCart, FaWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeProduct,
} from "../../features/cartSlice";

const Cart = () => {
  const [openCart, setOpenCart] = useState(false);
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const handelOpenCart = () => {
    setOpenCart(!openCart);
  };

  const calculateTotalPrice = () => {
    const totalPrice = products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
    return totalPrice.toFixed(2);
  };

  return (
    <div>
      <div>
        <FaShoppingCart
          onClick={handelOpenCart}
          className="relative cursor-pointer text-4xl"
        />
        <span
          onClick={handelOpenCart}
          className="cursor-pointer absolute w-5 h-5 rounded-full flex items-center justify-center text-xs  right-0 top-3 text-white bg-red-600"
        >
          {products.length}
        </span>
      </div>
      {openCart && (
        <div className="absolute right-0 top-0 bg-black text-white z-50 p-3 h-full w-[40%]">
          <FaWindowClose
            className="absolute w-10 h-10 top-0 left-0 bg-black cursor-pointer text-white"
            onClick={handelOpenCart}
          />
          <div className="flex justify-center items-center gap-4 mb-10 p-3 border-b-2 border-white">
            <FaShoppingCart
              onClick={handelOpenCart}
              className="relative cursor-pointer text-4xl"
            />
            <span
              onClick={handelOpenCart}
              className="cursor-pointer absolute w-5 h-5 rounded-full flex items-center justify-center text-xs text-white bg-red-600 top-7"
            >
              {products.length}
            </span>
            <p>Cart</p>
          </div>
          {products.length === 0 ? (
            <div className="text-center mb-6">
              Add some products in the cart
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id}>
                <div key={product.id}>
                  <div className="flex gap-5 p-1 mb-14">
                    <div className="flex gap-5">
                      <img className="w-14" src={product.image} alt="" />
                      <div>
                        <p>{product.title}</p>
                        <span>Quantity: {product.quantity}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => dispatch(removeProduct(product.id))}
                        className="bg-red-500 p-1"
                      >
                        Remove
                      </button>
                      <span className="text-right">$ {product.price}</span>
                      <div className="flex justify-around items-center">
                        <button
                          onClick={() =>
                            dispatch(incrementQuantity(product.id))
                          }
                          className="border w-5 h-5 flex justify-center items-center"
                        >
                          +
                        </button>
                        <button
                          onClick={() =>
                            dispatch(decrementQuantity(product.id))
                          }
                          className="border w-5 h-5 flex justify-center items-center"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          <div className="flex justify-between items-center border-t-2 border-white p-3">
            <h3>Total</h3>
            <span className="text-xl font-bold">${calculateTotalPrice()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
