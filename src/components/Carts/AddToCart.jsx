import React from "react";

function AddToCart({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 text-sm font-medium bg-black text-white hover:bg-slate-700"
    >
      Add to cart
    </button>
  );
}

export default AddToCart;
