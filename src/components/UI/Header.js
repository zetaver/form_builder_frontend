import React, { useState } from "react";
import "../../styles/Header.css";

const Header = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownVisible((prev) => !prev); // Toggle dropdown visibility
  };

  const handleLogout = () => {
    // Clear authentication data (e.g., token)
    localStorage.removeItem("authToken");
    // Redirect to the login page
    window.location.href = "/login";
  };

  return (
    <header className="header">
      {/* Top Section: ZETA form */}
      <div className="header-top">
        <h1 className="header-logo">ZETA form</h1>
        <div className="header-right">
          <a href="/documentation" className="header-doc">
            <img src="/icons/documentation.svg" alt="Documentation Icon" className="icon" />
            Documentation
          </a>
          <div className="header-user" onClick={handleDropdownToggle}>
            <img src="/icons/user_identification.svg" alt="User Icon" className="icon" />
            <span>User</span>
            {isDropdownVisible && (
              <ul className="dropdown-menu">
                <li>
                  <a href="/profile">Profile</a>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section: Navigation Bar */}
      <div className="header-nav">
        <button className="scroll-button left-scroll">
          <img src="/icons/Chevron_Double_Right.svg" alt="Scroll Left" />
        </button>
        <ul className="header-links">
          <li>
            <img src="/icons/Page_Setting.svg" alt="Forms Icon" className="icon" />
            <a href="/forms">Forms</a>
          </li>
          <li>
            <img src="/icons/Database_Server.svg" alt="Resources Icon" className="icon" />
            <a href="/resources">Resources</a>
          </li>
          <li>
            <img src="/icons/Database_Check.svg" alt="Data Icon" className="icon" />
            <a href="/data">Data</a>
          </li>
          <li>
            <img src="/icons/Medical_Files_Report_History.svg" alt="Report Icon" className="icon" />
            <a href="/report">Report</a>
          </li>
          <li>
            <img src="/icons/Keyhole_Lock_Circle.svg" alt="Access Icon" className="icon" />
            <a href="/access">Access</a>
          </li>
          <li>
            <img src="/icons/Threat_Folder.svg" alt="Staging Icon" className="icon" />
            <a href="/staging">Staging</a>
          </li>
          <li>
            <img src="/icons/Convert_PDF.svg" alt="PDF Icon" className="icon" />
            <a href="/pdf">PDF</a>
          </li>
          <li>
            <img src="/icons/User_Protection.svg" alt="Usage Icon" className="icon" />
            <a href="/usage">Usage</a>
          </li>
        </ul>
        <button className="scroll-button right-scroll">
          <img src="/icons/Chevron_Double_Left.svg" alt="Scroll Right" />
        </button>
      </div>
    </header>
  );
};

export default Header;
