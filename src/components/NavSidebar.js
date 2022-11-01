import React, { useState } from "react";

import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa"; 
import * as AiIcons from "react-icons/ai";
import {Link} from 'react-router-dom';
import './NavSideBar.css'



import { NavSideBarData } from "./NavSideBarData";


export default function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#000" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <h1 className ='title'>FITARC</h1>
          <div className="rightHandContainerOptions">
            <p className="accountSettingsButton">Account Settings</p>
            <p className="LogOutButton"><Link to='/' className="link">Log Out</Link></p>
          </div>

        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars" >
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            {NavSideBarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}