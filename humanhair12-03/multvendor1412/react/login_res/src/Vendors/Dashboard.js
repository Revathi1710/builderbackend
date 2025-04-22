import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import VendorHeader from "./vendorHeader";
import "../SuperAdmin/addcategory.css";
import "./sidebar2.css";
import "./UserProfile.css";

import "./dashboard.css";

import ProductChartVendor from "./Dashboardgraph";
import Vendorbarchart from "./Vendorbarchart";

const AlldetailsVendor = () => {
  const [error, setError] = useState(null);
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [approvedProductCount, setApprovedProductCount] = useState(0);
  const [rejectProductCount, setRejectProductCount] = useState(0);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const vendorId = localStorage.getItem("vendorId");
  const handleSubMenuToggle = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
      // Ensure vendorId is correctly stored

        if (!vendorId) {
          setError("Vendor ID is missing");
          return;
        }

        console.log("Fetching counts for vendor:", vendorId);

        // Fetch Total Products
        const productResponse = await axios.post(`${process.env.REACT_APP_API_URL}/getVendorProductcount`, { vendorId });
        if (productResponse.data.status === "ok") {
          setProductCount(productResponse.data.data.productCount);
        } else {
          console.error("Product count error:", productResponse.data.message);
        }

        // Fetch Categories Count
        const categoryResponse = await axios.post(`${process.env.REACT_APP_API_URL}/getVendorCategorycount`, { vendorId });
        if (categoryResponse.data.status === "ok") {
          setCategoryCount(categoryResponse.data.data.categoryCount);
        } else {
          console.error("Category count error:", categoryResponse.data.message);
        }

        // Fetch Approved Products Count
        const approvedResponse = await axios.post(`${process.env.REACT_APP_API_URL}/getVendorApprovedProductcount`, { vendorId });
        if (approvedResponse.data.status === "ok") {
          setApprovedProductCount(approvedResponse.data.data.productCount);
        } else {
          console.error("Approved product count error:", approvedResponse.data.message);
        }

        // Fetch Rejected Products Count
        const rejectResponse = await axios.post(`${process.env.REACT_APP_API_URL}/getVendorRejectProductcount`, { vendorId });
        if (rejectResponse.data.status === "ok") {
          setRejectProductCount(rejectResponse.data.data.productCount);
          console.log("Rejected product count:", rejectResponse.data.data.productCount);
        } else {
          console.error("Rejected product count error:", rejectResponse.data.message);
        }

      } catch (error) {
        console.error("Error fetching counts:", error);
        setError("Error fetching data. Please try again later.");
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="update-profile-vendor">
      <VendorHeader />
      <div className="content row mt-4">
        <div className="col-sm-3">
          <ul className="VendorList">
            <li className="list">
              <Link to="/Vendor/Dashboard"><i className="fas fa-home sidebaricon"></i> Dashboard</Link>
            </li>
          </ul>
          <ul className="nano-content VendorList">
            <li className={`sub-menu list ${activeSubMenu === 5 ? "active" : ""}`}>
              <a href="#!" onClick={() => handleSubMenuToggle(5)}>
                <i className="fas fa-user-alt sidebaricon"></i>
                <span>Profile</span>
                <i className="arrow fa fa-angle-right pull-right"></i>
              </a>
              <ul style={{ display: activeSubMenu === 5 ? "block" : "none" }} className="vendorsidebarmenu">
                <li className="list_sidebar"><Link to="/Vendor/UserProfile" className="listsidebar">User Profile</Link></li>
                <li className="list_sidebar"><Link to="/Vendor/BusinessProfile" className="listsidebar">Business Profile</Link></li>
              </ul>
            </li>

            <li className={`sub-menu list ${activeSubMenu === 0 ? "active" : ""}`}>
              <a href="#!" onClick={() => handleSubMenuToggle(0)}>
                <i className="fab fa-product-hunt sidebaricon"></i>
                <span>Product</span>
                <i className="arrow fa fa-angle-right pull-right"></i>
              </a>
              <ul style={{ display: activeSubMenu === 0 ? "block" : "none" }} className="vendorsidebarmenu">
                <li className="list_sidebar"><Link to="/Vendor/AllProduct" className="listsidebar">All Products</Link></li>
                <li className="list_sidebar"><Link to="/Vendor/AddProductVendor" className="listsidebar">Add Product</Link></li>
              </ul>
            </li>

            <ul className="VendorList">
              <li className="list">
                <i className="fas fa-sign-out-alt sidebaricon"></i> Logout
              </li>
            </ul>
          </ul>
        </div>

        <div className="col-sm-8 userinfo-container">
          <h3 className="title-vendorInfo">Dashboard</h3>
          {error && <p className="error">{error}</p>}
          <div className="row">
            <div className="col-sm-6 vendordashboard-col" style={{background:"#fff5d9"}}>
              <h6>Total Products</h6>
              <h2>{productCount}</h2>
            </div>
            <div className="col-sm-6 vendordashboard-col"  style={{background:"#d9f8ff"}}>
              <h6>Approved Products</h6>
              <h2>{approvedProductCount}</h2>
            </div>
            <div className="col-sm-6 vendordashboard-col" style={{background:"#ffd9d9"}}>
              <h6>Rejected Products</h6>
              <h2>{rejectProductCount}</h2>
            </div>
          </div>
          <div>
         {/* {vendorId ? <ProductChartVendor vendorId={vendorId} /> : <p>Loading vendor ID...</p>} */}
          {vendorId ? <Vendorbarchart vendorId={vendorId} /> : <p>Loading vendor ID...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlldetailsVendor;
