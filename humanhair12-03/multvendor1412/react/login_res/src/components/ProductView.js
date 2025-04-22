import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import RelatedProduct from '../components/RelatedProduct';
import MoreSellerProduct from '../components/MoreSellerProduct';
import axios from 'axios';
import './productview.css';
import Footer from './Footer';

const ProductView = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [userData, setUserData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleChange = (e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1));
  const handleTabClick = (tab) => setActiveTab(tab);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productResponse = await axios.get(`${process.env.REACT_APP_API_URL}/ProductView/${id}`);
        if (productResponse.data.status === 'ok') {
          setProduct(productResponse.data.data);
        } else {
          setError(productResponse.data.message);
        }

        const reviewsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/productReviews/${id}`);
        if (reviewsResponse.data.status === 'ok') {
          setReviews(reviewsResponse.data.data);
        } else {
          setError(reviewsResponse.data.message);
        }
      } catch (err) {
        setError('An error occurred: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserData = async () => {
      const storedUserId = localStorage.getItem('userId');
      if (!storedUserId) return;

      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/userData`, { id: storedUserId });
        if (response.data.status === 'ok') {
          setUserData(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching user data:', err.message);
      }
    };

    fetchProduct();
    fetchUserData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleEnquiry = async (e) => {
    e.preventDefault();

    if (!userData) {
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
      window.location.href = '/login';
      return;
    }

    const enquiryData = {
      productname: product.name,
      product_id: id,
      productPrice: product.sellingPrice,
      vendorId: product.vendorId._id,
      UserId: userData._id,
      Username: userData.fname,
      UserNumber: userData.number,
      Quality: quantity,
      vendorName: product.vendorId.fname,
      vendorBusinessName: product.vendorId.businessName,
      vendorNumber: product.vendorId.number,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/sendEnquiry`, enquiryData, {
        headers: { 'Content-Type': 'application/json' },
      });
      const data = response.data;
      setMessage(data.status === 'ok' ? 'Enquiry sent successfully!' : data.message);
    } catch (err) {
      setMessage('An error occurred: ' + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Navbar />

      {product && (
        <>
          {/* Background Banner 
          <div
  className="backgroundProjectImage"
  style={{
    backgroundImage: product.image
      ? `url("${process.env.REACT_APP_API_URL}/${product.image.replace(/\\/g, '/')}")`
      : `url("/path_to_default_image.jpg")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '500px',
    width: '100%',
  }}
></div>*/}
<div className="productimage-container5">
<video
  src={
    product.image
      ? `${process.env.REACT_APP_API_URL}/${product.roomVideo.replace(/\\/g, '/')}`
      : '/path_to_default_video.mp4'
}
  controls
  width="100%"
>
  Your browser does not support the video tag.
</video>


                     {/* <img
                        src={
                          product.image
                            ? `${process.env.REACT_APP_API_URL}/${product.image.replace('\\', '/')}`
                            : '/path_to_default_image.jpg'
                        }
                        className="img-fluid product-view-image" 
                        alt={product.name}
                      />*/}
                      <div className='projectnameBtn'>

                      <h3 className="productName">{product.name}</h3>
                      <form onSubmit={handleEnquiry}>
                    <button className="btn btn-primary sendenq">Send Enquiry</button>
                  </form>
                  {message && <p className="mt-2 text-success">{message}</p>}
                      </div>
                    </div>

          {/* Product Section */}
          <div className="row productview-section">
            <div className="col-md-9 productDetails">
              <div className="row productrow">
                <div className="productimage-showcase">
                  <div className="productimage-sticky">
                    <div className="productimage-container">
                      <img
                        src={
                          product.image
                            ? `${process.env.REACT_APP_API_URL}/${product.image.replace('\\', '/')}`
                            : '/path_to_default_image.jpg'
                        }
                        className="img-fluid product-view-image"
                        alt={product.name}
                      />
                    </div>
                  </div>
                </div>

                <div className="product-special-section">
               

                  {/* Quantity Control */}
                  <div className="quantity-wrapper d-flex align-items-center mb-3">
                    <button onClick={handleDecrease} className="btn btn-sm btn-outline-secondary">-</button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={handleChange}
                      className="form-control mx-2"
                      style={{ width: '60px' }}
                      min="1"
                    />
                    <button onClick={handleIncrease} className="btn btn-sm btn-outline-secondary">+</button>
                  </div>

                  {/* Enquiry Button */}
                

                  {/* Tabs */}
                  <div className="tabs mt-4">
                    <button
                      onClick={() => handleTabClick('overview')}
                      className={`btn btn-sm me-2 ${activeTab === 'overview' ? 'btn-dark' : 'btn-outline-dark'}`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => handleTabClick('reviews')}
                      className={`btn btn-sm ${activeTab === 'reviews' ? 'btn-dark' : 'btn-outline-dark'}`}
                    >
                      Reviews
                    </button>
                  </div>

                  {/* Tab Content */}
                  {activeTab === 'overview' && (
                    <div className="productOverview mt-3">
                      <h4>Product Overview</h4>
                      <p className="description">{product.description}</p>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="productReviews mt-3">
                      <h4>Customer Reviews</h4>
                      {reviews.length > 0 ? (
                        reviews.map((rev, idx) => (
                          <div key={idx} className="review-box border p-2 mb-2">
                            <p><strong>{rev.user}</strong>: {rev.comment}</p>
                          </div>
                        ))
                      ) : (
                        <p>No reviews yet.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Optional Related Products */}
          <RelatedProduct productId={id} />
          <MoreSellerProduct vendorId={product.vendorId._id} />
        </>
      )}

      {!product && <p>Product not found.</p>}

      <Footer />
    </div>
  );
};

export default ProductView;
