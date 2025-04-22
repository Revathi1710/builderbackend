import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./buildercategory.css";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getCategoryHome`)
      .then((response) => {
        if (response.data.status === "ok") {
          setProducts(response.data.data);
        } else {
          setError(response.data.message);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("An error occurred while fetching data");
        setLoading(false);
      });
  }, []);

  return (
    <div className="product-grid-container">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div className="product-grid">
          {products.map((product, index) => (
            <ProductCard
              key={product._id || index}
              _id={product._id}
              imgSrc={`${process.env.REACT_APP_API_URL}/${product.image.replace('\\', '/')}`}
              name={product.name}
              description={product.description}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
