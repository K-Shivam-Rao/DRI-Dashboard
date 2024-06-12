import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const logo =
    "https://ideogram.ai/assets/image/lossless/response/2vtbWvzzQu6ZHZaPgVmcwQ";
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="user-dropdown">
        <select>
          <option value="username">Username</option>
        </select>
      </div>
      <div className="menu">
        <ul>
          <li>Dashboard</li>
          <li>Define Pillar & Indicator</li>
          <li>Scenario Analysis</li>
          <li>ROI Analysis</li>
          <li>Statistics</li>
          <li>Reports</li>
          <li>History</li>
        </ul>
        <h3>Settings</h3>
        <ul>
          <li>Profile</li>
          <li>Settings</li>
          <li>Help</li>
        </ul>
        <h3>Other Information</h3>
        <ul>
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
          <li>Project Version</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
