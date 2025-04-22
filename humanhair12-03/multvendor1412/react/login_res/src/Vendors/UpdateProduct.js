import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';

import '../SuperAdmin/addcategory.css';
import './sidebar2.css';
import './UserProfile.css';
import menu from '../icons/menu.png'; 
import infogif from '../icons/gifinfo.gif';
import noimg from '../icons/noimg.png';
import loginlearn1 from '../icons/loginlearn1.png';
import profilelearn from '../icons/profilelearn.png';
import loginlearn from '../icons/productlearn.png';
import orderlearn from '../icons/orderlearn.png';
import securelearn from '../icons/securelearn.png';


const UpdateProductVendor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [smalldescription, setSmallDescription] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(true);
  const [originalPrice, setOriginalPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [galleryImage1, setGalleryImage1] = useState(null);
  const [galleryImage2, setGalleryImage2] = useState(null);
  const [galleryImage3, setGalleryImage3] = useState(null);
  const [galleryImage4, setGalleryImage4] = useState(null);

  const [galleryImage1Preview, setGalleryImage1Preview] = useState("");
  const [galleryImage2Preview, setGalleryImage2Preview] = useState("");
  const [galleryImage3Preview, setGalleryImage3Preview] = useState("");
  const [galleryImage4Preview, setGalleryImage4Preview] = useState("");
  const [sidebarmenuOpen, setSidebarmenuOpen] = useState(false);
  
  const toggleVendorsidebar = () => {
    setSidebarmenuOpen(!sidebarmenuOpen);
  };
  useEffect(() => {
    fetchProductDetails();
    fetchCategories();
  }, []);
  const handleSubMenuToggle = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };
  const handleLogout = () => {
    localStorage.removeItem('vendorId'); // Remove vendorId
    window.location.href = '/vendor/login'; // Redirect to login page
  };
  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetproductVendor/${id}`
      );
      const data = response.data;

      if (data.status === "ok") {
        const product = data.data;
        setName(product.name);
        setSlug(product.slug);
        setSmallDescription(product.smalldescription);
        setDescription(product.description);
        setActive(product.active);
        setOriginalPrice(product.originalPrice);
        setSellingPrice(product.sellingPrice);
        setCategory(product.category);

        if (product.image) {
          setImagePreview(
            `${process.env.REACT_APP_API_URL}/${product.image.replace("\\", "/")}`
          );
        }
        if (product.galleryimage1) {
          setGalleryImage1Preview(
            `${process.env.REACT_APP_API_URL}/${product.galleryimage1.replace(
              "\\",
              "/"
            )}`
          );
        }
        if (product.galleryimage2) {
          setGalleryImage2Preview(
            `${process.env.REACT_APP_API_URL}/${product.galleryimage2.replace(
              "\\",
              "/"
            )}`
          );
        }
        if (product.galleryimage3) {
          setGalleryImage3Preview(
            `${process.env.REACT_APP_API_URL}/${product.galleryimage3.replace(
              "\\",
              "/"
            )}`
          );
        }
        if (product.galleryimage4) {
          setGalleryImage4Preview(
            `${process.env.REACT_APP_API_URL}/${product.galleryimage4.replace(
              "\\",
              "/"
            )}`
          );
        }
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("An error occurred: " + error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/getCategoryHome`
      );
      const data = response.data;

      if (data.status === "ok") {
        setCategories(data.data);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("An error occurred: " + error.message);
    }
  };

  const handleImageChange = (e, setImageFn, setPreviewFn) => {
    const file = e.target.files[0];
    setImageFn(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFn(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_id", id);
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("smalldescription", smalldescription);
    if (image) formData.append("image", image);
    if (galleryImage1) formData.append("galleryimage1", galleryImage1);  // Fixed: Changed "galleryImage1" → "galleryimage1"
    if (galleryImage2) formData.append("galleryimage2", galleryImage2);  // Fixed: Changed "galleryImage2" → "galleryimage2"
    if (galleryImage3) formData.append("galleryimage3", galleryImage3);  // Fixed: Changed "galleryImage3" → "galleryimage3"
    if (galleryImage4) formData.append("galleryimage4", galleryImage4);  // Fixed: Changed "galleryImage4" → "galleryimage4"
    formData.append("description", description);
    formData.append("active", active);
    formData.append("originalPrice", originalPrice);
    formData.append("sellingPrice", sellingPrice);
    formData.append("category", category);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/updateProductVendor`,
        formData
      );
      const data = response.data;

      if (data.status === "ok") {
        alert("Product updated successfully!");
        navigate("/Vendor/AllProduct");
      } else {
        alert(data.message || "Product update failed!");
      }
    } catch (error) {
      setMessage("An error occurred while updating the product.");
    }
};

  return (
    <div className="update-profile-vendor">
          <Navbar />
             <div className="vendor-sidebarmobile-menu mx-2 mt-2">
         <div style={{ position: "relative" }}>
           <img 
             src={menu} 
             width={30} 
             alt="Menu" 
             className="usermenu-bar-vendor" 
             onClick={toggleVendorsidebar}
           />
         </div>
         </div>
    <div className="content row mt-4">
    <div className='col-sm-3 desktop-vendor-sidebar'>
          <ul className='VendorList'>
            <li className='list'> <Link to="/Vendor/Dashboard"><i className="fas fa-home sidebaricon"></i> Dashboard</Link></li>
          </ul>
          <ul className="nano-content VendorList">
            <li className={`sub-menu list ${activeSubMenu === 5 ? 'active' : ''}`}>
              <a href="#!" onClick={() => handleSubMenuToggle(5)}>
                <i className="fas fa-user-alt sidebaricon"></i><span>Profile</span><i className="arrow fa fa-angle-right pull-right"></i>
              </a>
              <ul style={{ display: activeSubMenu === 5 ? 'block' : 'none' }} className='vendorsidebarmenu'>
                <li className='list_sidebar'><Link to="/Vendor/UserProfile" className='listsidebar'>User Profile</Link></li>
                <li className='list_sidebar'><Link to="/Vendor/BusinessProfile" className='listsidebar'>Business Profile</Link></li>
               {/* <li className='list_sidebar'><Link to="/Vendor/BankDetails" className='listsidebar'>Bank Details</Link></li>*/}
              </ul>
            </li>
            <li className={`sub-menu list ${activeSubMenu === 0 ? 'active' : ''}`}>
              <a href="#!" onClick={() => handleSubMenuToggle(0)}>
                <i className="fab fa-product-hunt sidebaricon"></i><span>Product</span><i className="arrow fa fa-angle-right pull-right"></i>
              </a>
              <ul style={{ display: activeSubMenu === 0 ? 'block' : 'none' }} className='vendorsidebarmenu'>
              <li className='list_sidebar'><Link to="/Vendor/AllProduct" className='listsidebar'>All Product</Link></li>
              <li className='list_sidebar'><Link to="/Vendor/AddProductVendor" className='listsidebar'>Add Product</Link></li>
              </ul>
            </li>
          
         
            <ul className='VendorList' onClick={handleLogout}>
            <li className='list'><i className="fas fa-sign-out-alt sidebaricon"></i>Logout</li>
          </ul>
         
          </ul>
      
        </div>
      

      {/* Sidebar */}
      <div className={`mobiles-vendor-sidebar ${sidebarmenuOpen ? "active" : ""}`}>
        <div className="overlay">
          <div className="text-left mobileclose-btn">
            <button className="mt-2 closebtn" onClick={toggleVendorsidebar}>
              <i className="fas fa-arrow-left"></i>
            </button>
          </div>
          <ul className="VendorList">
            <li className="list">
              <Link to="/Vendor/Dashboard">
                <i className="fas fa-home sidebaricon"></i> Dashboard
              </Link>
            </li>
          </ul>
          <ul className="nano-content VendorList">
            <li className={`sub-menu list ${activeSubMenu === 5 ? 'active' : ''}`}>
              <a href="#!" onClick={() => handleSubMenuToggle(5)}>
                <i className="fas fa-user-alt sidebaricon"></i><span>Profile</span><i className="arrow fa fa-angle-right pull-right"></i>
              </a>
              <ul style={{ display: activeSubMenu === 5 ? 'block' : 'none' }} className='vendorsidebarmenu'>
                <li className='list_sidebar'><Link to="/Vendor/UserProfile" className='listsidebar'>User Profile</Link></li>
                <li className='list_sidebar'><Link to="/Vendor/BusinessProfile" className='listsidebar'>Business Profile</Link></li>
               {/* <li className='list_sidebar'><Link to="/Vendor/BankDetails" className='listsidebar'>Bank Details</Link></li>*/}
              </ul>
            </li>
            <li className={`sub-menu list ${activeSubMenu === 0 ? 'active' : ''}`}>
              <a href="#!" onClick={() => handleSubMenuToggle(0)}>
                <i className="fab fa-product-hunt sidebaricon"></i><span>Product</span><i className="arrow fa fa-angle-right pull-right"></i>
              </a>
              <ul style={{ display: activeSubMenu === 0 ? 'block' : 'none' }} className='vendorsidebarmenu'>
              <li className='list_sidebar'><Link to="/Vendor/AllProduct" className='listsidebar'>All Product</Link></li>
              <li className='list_sidebar'><Link to="/Vendor/AddProductVendor" className='listsidebar'>Add Product</Link></li>
              </ul>
            </li>
          
         
            <ul className='VendorList' onClick={handleLogout}>
            <li className='list'><i className="fas fa-sign-out-alt sidebaricon"></i>Logout</li>
          </ul>
         
          </ul>
        </div>
      </div>
             
       
    <div className="col-sm-8">
      <div className=' businessinfo-container'>
          <h1 className="title-vendorInfo">Update Product</h1>
                    <div className="col-sm-12 mt-2">
                       
                    <form onSubmit={handleSubmit} className="category-form">
            <label htmlFor="category">Category</label>
              <select
  id="category"
  className="form-control"
  onChange={(e) => setCategory(e.target.value)}
  value={category}
>
  <option value="">Select Category</option>
  {categories.map((cat) => (
    <option key={cat._id} value={cat._id}>
      {cat.name}
    </option>
  ))}
</select>

        
          <div className='form-row row'>
            <div className='form-group col-sm-6 mb-4'>
              <label htmlFor="name">Name</label>
              <input
                type='text'
                id='name'
                placeholder='Product Name'
                className='form-control'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='form-group col-sm-6 mb-4'>
              <label htmlFor="slug">Slug</label>
              <input
                type='text'
                id='slug'
                placeholder='Product Slug'
                className='form-control'
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <div className='form-group col-sm-6 mb-4'>
              <label htmlFor="originalPrice">Original Price</label>
              <input
                type='text'
                id='originalPrice'
                placeholder='Original Price'
                className='form-control'
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
              />
            </div>
            <div className='form-group col-sm-6 mb-4'>
              <label htmlFor="sellingPrice">Selling Price</label>
              <input
                type='text'
                id='sellingPrice'
                placeholder='Selling Price'
                className='form-control'
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
              />
            </div>
            <div className='form-group mb-4'>
              <label htmlFor="smalldescription">Small Description</label>
              <textarea
                id='smalldescription'
                className='form-control'
                placeholder='Small Description'
                rows="3"
                value={smalldescription}
                onChange={(e) => setSmallDescription(e.target.value)}
              />
            </div>
            <div className='form-group mb-4'>
              <label htmlFor="description">Description</label>
              <textarea
                id='description'
                className='form-control'
                placeholder='Product Description'
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='form-group col-sm-6 mb-4'>
              <label htmlFor="image">Image</label>
              <input
        type="file"
        className="form-control"
        accept="image/*"
        onChange={(e) => handleImageChange(e, setImage, setImagePreview)}
      />
      {imagePreview && <img src={imagePreview} alt="Preview" width="100" />}
            </div>
        
         
            <div className='form-group  col-sm-6 mb-4'>
              <label>Status</label>
              <div className="status-options">
                <label>
                  <input
                    type='radio'
                    name="status"
                    value={true}
                    checked={active === true}
                    onChange={() => setActive(true)}
                  /> Active
                </label>
                <label>
                  <input
                    type='radio'
                    name="status"
                    value={false}
                    checked={active === false}
                    onChange={() => setActive(false)}
                  /> Inactive
                </label>
              </div>
              </div>
             
       

      {[1, 2, 3, 4].map((num) => (
        <div key={num} className="form-group col-sm-6">
          <label htmlFor={`galleryImage${num}`}>Gallery Image {num}</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) =>
              handleImageChange(
                e,
                eval(`setGalleryImage${num}`),
                eval(`setGalleryImage${num}Preview`)
              )
            }
          />
          {eval(`galleryImage${num}Preview`) && (
            <img src={eval(`galleryImage${num}Preview`)} alt="Preview" width="100" />
          )}
        </div>
      ))}
                
          </div>
          <button type="submit" className="btn submit-btn">Update Product</button>
        </form>
      </div>
    </div>
   
              
            </div></div></div>
     
  );
};

export default UpdateProductVendor;
