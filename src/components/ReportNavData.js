import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as FcIcons from "react-icons/fc";
import * as BsIcons from "react-icons/bs";
import * as IoIcons from "react-icons/io";

export const ReportNavData = [
  {
    title: "Sales",
    path: "/Report",
    icon: <FaIcons.FaShoppingCart />,
    cName: "nav-text",
  },

  {
    title: "Customers",
    path: "/Report",
    icon: <BsIcons.BsPersonPlusFill />,
    cName: "nav-text",
  },
  {
    title: "Sellers",
    path: "/Report/Sellers",
    icon: <IoIcons.IoMdPersonAdd />,
    cName: "nav-text",
  },
  // {
  //   title: "Users",
  //   path: "/Report/Users",
  //   icon: <BsIcons.BsFillPersonLinesFill />,
  //   cName: "nav-text",
  // },
];
