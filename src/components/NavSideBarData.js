import React from "react";

import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as GiIcons from "react-icons/gi";

export const NavSideBarData = [
  {
    title: "Profile",
    path: "/",
    icon: <AiIcons.AiOutlineUser />,
    cName: "nav-text"
  },
  {
    title: "Nutrition",
    path: "/nutrition",
    icon: <GiIcons.GiForkKnifeSpoon />,
    cName: "nav-text"
  },
  {
    title: "Fitness",
    path: "/fitness",
    icon: <IoIcons.IoIosFitness />,
    cName: "nav-text"
  }
];