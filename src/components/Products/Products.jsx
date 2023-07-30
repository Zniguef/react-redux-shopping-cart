import { useState, useEffect, useContext } from "react";
import fetchApi from "../../api/DataApi";
import AddToCart from "../Carts/AddToCart";
import { AiFillStar } from "react-icons/ai";
import StoreContext from "../../hook/StoreContext";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";

function Products() {
  const [products, setProducts] = useState([]);
  const [filtredProducts, setFiltredProducts] = useState([]);
  const { filter } = useContext(StoreContext);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await fetchApi.get("products");
      setProducts(data?.data);
      setFiltredProducts(data?.data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (filter) {
      const proList = products.filter((product) => product.category === filter);
      setFiltredProducts(proList);
    } else {
      setFiltredProducts(products);
    }
  }, [filter, products]);

  return (
    <div className="w-[60%] pt-7">
      <div className="mb-7">{`${filtredProducts.length} Product(s) found`}</div>
      <div className="grid grid-cols-4 gap-y-6 gap-x-3">
        {filtredProducts.map((product) => (
          <div
            key={product?.id}
            className="flex flex-col justify-between mb-2 p-2 text-center"
          >
            <img
              className="w-full h-32 object-contain"
              src={product?.image}
              alt={product?.title}
            />
            <p className="text-sm py-4">{product?.title}</p>
            <div>
              <span className="font-extrabold mb-1">
                {`$${product?.price.toString().split(".")[0]}`}
              </span>
              <span className="text-sm">
                {product?.price.toString().split(".")[1] &&
                  `.${product?.price.toString().split(".")[1]}`}
              </span>
            </div>
            <div className="flex justify-center items-center mb-5 text-xs">
              <span className="">{product?.rating?.rate}</span>
              <AiFillStar className="text-yellow-400" />
            </div>
            <AddToCart
              onClick={() =>
                dispatch(
                  addToCart({
                    id: product?.id,
                    title: product?.title,
                    image: product?.image,
                    price: product?.price,
                    quantity: 1,
                  })
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
