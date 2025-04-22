import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';

import '../SuperAdmin/addcategory.css';
import './sidebar2.css';
import './UserProfile.css';
import menu from '../icons/menu.png'; 




const AddProductVendor = () => {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');

    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [active, setActive] = useState('');
    const [vendorId, setVendorId] = useState('');
    const [floorSpace, setfloorSpace] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [noBedroom, setnoBedroom] = useState('');
    const [noBathroom, setnoBathroom] = useState('');
       const [roomVideo, setRoomVideo] = useState('');
    const [overallSize, setoverallSize] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    
    const [subcategories, setSubCategories] = useState([]);
    const [galleryImage1, setGalleryImage1] = useState('');
    const [galleryImage2, setGalleryImage2] = useState('');
    
    const [galleryImage3, setGalleryImage3] = useState('');
    const [galleryImage4, setGalleryImage4] = useState('');

    const [filteredSubcategories, setFilteredSubCategories] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [vendorData, setVendorData] = useState({});
    const [error, setError] = useState(null);
    const [categoryName, setCategoryName] = useState('');
const [sidebarmenuOpen, setSidebarmenuOpen] = useState(false);
    const [message, setMessage] = useState('');
    const toggleVendorsidebar = () => {
      setSidebarmenuOpen(!sidebarmenuOpen);
    };
   
    
    // Close Sidebar
    const closeSidebar = () => {
      setSidebarmenuOpen(false);
    };
    useEffect(() => {
        const token = localStorage.getItem('vendortoken');
        const storedVendorId = localStorage.getItem('vendorId');
        if (token && storedVendorId) {
          try {
            const decoded = jwtDecode(token); // Correct function name
            setVendorId(storedVendorId); // Set the vendorId from localStorage
          } catch (error) {
            console.error('Invalid token or failed to decode:', error);
          }
        } else {
          alert('Vendor not authenticated. Please log in.');
          // Redirect to login page or show an error
        }
      }, []);
    
      useEffect(() => {
        const vendorId = localStorage.getItem('vendorId');
        if (!vendorId) {
          alert('Vendor ID not found in local storage');
          return;
        }
    
        // You need to define vendortoken or remove this request if not used
        const vendortoken =  localStorage.getItem('vendortoken'); // Define or get vendortoken if needed
    
        axios.post(`${process.env.REACT_APP_API_URL}/vendorData`, { vendortoken })
          .then(response => {
            if (response.data.status === 'ok') {
              setVendorData(response.data.data);
            } else {
              setMessage(response.data.message);
            }
          })
          .catch(error => {
            console.error('Error:', error);
            setMessage(error.message);
          });
       
        fetchCategories();
        fetchSubCategories();
    }, []);
 const handleLogout = () => {
    localStorage.removeItem('vendorId'); // Remove vendorId
    window.location.href = '/vendor/login'; // Redirect to login page
  };
    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/getCategoryHome`);
            const data = response.data;
            if (data.status === 'ok') {
                setCategories(data.data);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('An error occurred: ' + error.message);
        }
    };

    const fetchSubCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/selectSubCatebaseCate`);
            const data = response.data;
            if (data.status === 'ok') {
                setSubCategories(data.data);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('An error occurred: ' + error.message);
        }
    };

    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        const selectedCategoryName = categories.find(cat => cat._id === selectedCategoryId)?.name || '';
    
        setCategory(selectedCategoryId);
        setCategoryName(selectedCategoryName);

        // Filter subcategories based on the selected category
        const filtered = subcategories.filter(subcat => subcat.Category === selectedCategoryId);
        setFilteredSubCategories(filtered);
    };

    const handleSubCategoryChange = (e) => {
        setSelectedSubCategory(e.target.value);
    };

    useEffect(() => {
        const token = localStorage.getItem('vendortoken');
        const storedVendorId = localStorage.getItem('vendorId');
        if (token && storedVendorId) {
            try {
                const decoded = jwtDecode(token);
                setVendorId(storedVendorId);
            } catch (error) {
                console.error('Invalid token or failed to decode:', error);
            }
        } else {
            alert('Vendor not authenticated. Please log in.');
        }
    }, []);

    useEffect(() => {
        if (vendorId) {
            axios.post(`${process.env.REACT_APP_API_URL}/vendorData`, { vendortoken: localStorage.getItem('vendortoken') })
                .then(response => {
                    if (response.data.status === 'ok') {
                        setVendorData(response.data.data);
                    } else {
                        setError(response.data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    setError(error.message);
                });
        }
    }, [vendorId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!vendorId) {
            alert("Invalid or missing vendorId. Please log in again.");
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('slug', slug);
   
        formData.append('image', image);
        formData.append('galleryImage1',galleryImage1);
        formData.append('galleryImage2',galleryImage2);
        formData.append('galleryImage3',galleryImage3);
        formData.append('galleryImage4',galleryImage4);
        formData.append('description', description);
        formData.append('active', active);
        formData.append('vendorId', vendorId);
        formData.append('overallSize', overallSize);
        formData.append('location', location);
        formData.append('floorSpace',floorSpace);
        formData.append('price', price);
        formData.append('noBedroom,', noBedroom);
        formData.append('noBathroom,', noBathroom);
        formData.append('roomVideo', roomVideo);
        formData.append('category', category);
       

        fetch(`${process.env.REACT_APP_API_URL}/addProduct`, {
            method: "POST",
            body: formData
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.status === 'ok') {
                alert('Product added successfully!');
                window.location.href = "Vendor/AllProduct";
            } else {
                alert(data.message || 'Product addition failed!');
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };

    const handleSubMenuToggle = (index) => {
        setActiveSubMenu(activeSubMenu === index ? null : index);
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
          <div className=" businessinfo-container">
          <h1 className="title-vendorInfo">Add Place</h1>
                    <div className="col-sm-12 mt-2">
                       
                    <form onSubmit={handleSubmit} className="category-form">
             
              <div className="form-row row">
              <div className="form-group col-sm-6">
                                        <label>Category</label>
                                        <select
                                            className="form-control col-sm-6"
                                            value={category}
                                            onChange={handleCategoryChange}
                                            required
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map((cat) => (
                                                <option key={cat._id} value={cat._id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                               
                <div className="form-group col-sm-6">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Project Name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="slug">Slug</label>
                  <input
                    type="text"
                    id="slug"
                    placeholder="Project Slug"
                    className="form-control"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    placeholder="Location"
                    className="form-control"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-sm-6 ">
                  <label htmlFor="floorSpace">Floor space</label>
                  <input
                    type="text"
                    id="floorSpace"
                    placeholder="Floor Space"
                    className="form-control"
                    value={floorSpace}
                    onChange={(e) => setfloorSpace(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="overallSize">Project overall size</label>
                  <input type="text"
                    id="overallSize"
                    className="form-control"
                    placeholder="Project overall size"
                  
                    value={overallSize}
                    onChange={(e) => setoverallSize(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="price">Price</label>
                  <input type="text"
                    id="price"
                    className="form-control"
                    placeholder="Price"
                  
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="price">No of Bedroom</label>
                  <select 
                    id="noBedroom"
                    className="form-control"
                   
                  
                    value={noBedroom}
                    onChange={(e) => setnoBedroom(e.target.value)}
                    required
                  >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  </select></div>
                  <div className="form-group col-sm-6">
                  <label htmlFor="price">No of Bathroom</label>
                  <select 
                    id="noBathroom"
                    className="form-control"
                   
                  
                    value={noBathroom}
                    onChange={(e) => setnoBathroom(e.target.value)}
                    required
                  >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    className="form-control"
                    placeholder="Product Description"
                    rows="5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="image">Image</label>
                  <input
                    type="file"
                    id="image"
                    className="form-control"
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="image/*"
                    required
                  />
                </div>
                <div className="form-group col-sm-6">
                  <label>Status</label>
                  <div className="status-options">
                    <label className="mr-3">
                      <input
                        type="radio"
                        name="status"
                        value={true}
                        checked={active === true}
                        onChange={() => setActive(true)}
                      />{' '}
                      Active
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="status"
                        value={false}
                        checked={active === false}
                        onChange={() => setActive(false)}
                      />{' '}
                      Inactive
                    </label>
                  </div>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="roomVideo">Room Video</label>
                  <input
                    type="file"
                    id="roomVideo"
                    className="form-control"
                    onChange={(e) =>setRoomVideo(e.target.files[0])}
                    accept="video/*"
                    required
                  />
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="galleryImage1">Gallery Image</label>
                  <input
                    type="file"
                    id="galleryImage1"
                    className="form-control"
                    onChange={(e) => setGalleryImage1(e.target.files[0])}
                    accept="image/*"
                    required
                  />
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="galleryImage2">Gallery Image2</label>
                  <input
                    type="file"
                    id="galleryImage2"
                    className="form-control"
                    onChange={(e) => setGalleryImage2(e.target.files[0])}
                    accept="image/*"
                    required
                  />
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="galleryImage3">Gallery Image3</label>
                  <input
                    type="file"
                    id="galleryImage3"
                    className="form-control"
                    onChange={(e) => setGalleryImage3(e.target.files[0])}
                    accept="image/*"
                    required
                  />
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="galleryImage4">Gallery Image4</label>
                  <input
                    type="file"
                    id="galleryImage4"
                    className="form-control"
                    onChange={(e) => setGalleryImage4(e.target.files[0])}
                    accept="image/*"
                    required
                  />
                </div> 
                
                <div className="form-group col-12 mt-3">
                  <button type="submit" className="btn btn-primary submitbtn ">
                    Add Project
                  </button>
                </div>
              </div>
            </form>
          
                    </div>
                    </div>
                </div>
             
            </div>
        </div>
    );
};

export default AddProductVendor;
