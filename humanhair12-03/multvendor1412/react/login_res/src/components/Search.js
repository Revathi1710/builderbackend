import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import Navbar from '../components/navbar';
import EnquiryModal from './EnquiryMode';

const SearchNavbar = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query"); // Extract query from URL

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (query) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/searchQuery?q=${query}`)
        .then((response) => {
          setResults(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [query]);

  const handleEnquiryClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const maskBusinessName = (name) => {
    if (!name || name.length <= 3) return name;
    return (
      <span>
        <span>{name.charAt(0)}</span>
        <span className="blur-text">{name.slice(1, -1)}</span>
        <span>{name.charAt(name.length - 1)}</span>
      </span>
    );
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 mt-4">
        <h2 className="mb-3 mt-5">Search Results for "{query || "Nothing"}"</h2>

        {loading ? (
          <p>Loading...</p>
        ) : results.length > 0 ? (
          <div className="row">
            {results.map((item, index) => (
              <div key={index} className="col-lg-2 col-md-4 col-sm-6 mb-4 feacture-product-card">
                <div className="card h-100">
                  <div className="card-imagehomecontainer">
                    <img
                      src={item.image ? `${process.env.REACT_APP_API_URL}/${item.image.replace('\\', '/')}` : "path_to_default_image.jpg"}
                      className="card-img-top homeproductimage"
                      alt={item.name || "default"}
                    />
                  </div>
                  <div className="card-body allpoductcard-body">
                    <Link to={`/ProductView/${item._id}`} className="card-title ellipsis2">
                      <div>{item.name}</div>
                    </Link>

                    {item.vendorDetails ? (
                      <>
                        {item.vendorDetails.businessName && (
                          <div className="companydetails companyname mt-4">
                            <h6 style={{ color: "black" }}>Brand Name:</h6>
                            {maskBusinessName(item.vendorDetails.businessName)}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="companydetails mt-4 text-muted">Vendor details unavailable</div>
                    )}

                    <button type="submit" name="Enquiry" className="mt-2 submit-btn" onClick={() => handleEnquiryClick(item)}>
                      Send Inquiry &nbsp;<i className="fas fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}

        {/* Enquiry Modal */}
        <EnquiryModal show={showModal} handleClose={handleModalClose} product={selectedProduct} />
      </div>
    </>
  );
};

export default SearchNavbar;
