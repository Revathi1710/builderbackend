import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard"; // Ensure this is styled for Bootstrap

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
        setError("An error occurred while fetching data.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container-category py-4 ">
    
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <div className="row">
        {!loading &&
          !error &&
          products.map((product, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={product._id || index}>
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={`${process.env.REACT_APP_API_URL}/${product.image.replace('\\', '/')}`}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">{product.name}</h5>
                  <p
  className="card-text text-muted text-center"
  style={{
    fontSize: "14px",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical"
  }}
>
  {product.description}
</p>

                  {/* Optional: add a button */}
                  {/* <a href={`/category/${product._id}`} className="btn btn-primary btn-sm">View More</a> */}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductGrid;
