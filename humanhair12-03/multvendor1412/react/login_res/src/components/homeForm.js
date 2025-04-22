import React, { useState } from "react";
import { FaMicrophone, FaCog } from "react-icons/fa";

const HomeForm = () => {
  const [activeTab, setActiveTab] = useState("Apartments");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    "Apartments",
   
    "Vilas",
    "Plots",
    "Farm Land",
   
  ];

  const handleTabClick = (tab) => setActiveTab(tab);

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching "${searchQuery}" in "${activeTab}"`);
  };

  return (
    <div className="containerform my-4">
      <div className="card shadow rounded-4 p-4">
        <ul className="nav nav-tabs mb-3 border-bottom">
          {tabs.map((tab) => (
            <li className="nav-item" key={tab}>
              <button
                className={`nav-link ${activeTab === tab ? "active" : ""}`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>

        <form onSubmit={handleSearch} className="d-flex gap-3 align-items-center">
          <select className="form-select w-auto rounded-3">
            <option>Residential</option>
            <option>Commercial</option>
          </select>

          <div className="position-relative flex-grow-1">
            <input
              type="text"
              className="form-control rounded-3 ps-4"
              placeholder=' Search '
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaCog
              style={{
                position: "absolute",
                top: "50%",
                left: "5px",
                transform: "translateY(-50%)",
                color: "#888",
              }}
            />
           
          </div>

          <button type="submit" className="btn btn-primary rounded-3 px-4">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomeForm;
