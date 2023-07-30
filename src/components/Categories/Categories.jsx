import React, { useContext, useEffect, useState } from "react";
import fetchApi from "../../api/DataApi";
import { GrPowerReset } from "react-icons/gr";
import StoreContext from "../../hook/StoreContext";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const { setFilter } = useContext(StoreContext);

  const handelFilterCategory = (e) => {
    setFilter(e.target.value);
  };

  const handelResetFilter = () => {
    setFilter("");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await fetchApi.get("products/categories");
      setCategories(data?.data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="w-[35%] p-7">
      <div className="flex items-center gap-2 mb-7">
        <h2>Reset filter</h2>{" "}
        <GrPowerReset
          className="w-10 h-10 p-2 bg-gray-300 cursor-pointer"
          onClick={handelResetFilter}
        />
      </div>
      <h3 className="text-base font-semibold mb-7">Filter by Category:</h3>
      <div className="grid grid-cols-4">
        {categories.map((product, index) => (
          <div key={index}>
            <button
              value={product}
              onClick={handelFilterCategory}
              className="w-16 h-16 text-xs bg-slate-100 rounded-full hover:bg-slate-400"
            >
              {product}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
