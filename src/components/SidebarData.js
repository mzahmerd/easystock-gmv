import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as FcIcons from "react-icons/fc";
import * as BsIcons from "react-icons/bs";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Store",
    path: "/",
    icon: <FaIcons.FaStore />,
    cName: "nav-text",
  },
  {
    title: "Sales",
    path: "/Sales",
    icon: <FaIcons.FaShoppingCart />,
    cName: "nav-text",
  },
  {
    title: "Purchase",
    path: "/Purchase",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "Report",
    path: "/Report",
    icon: <FcIcons.FcSalesPerformance />,
    cName: "nav-text",
  },
  {
    title: "Customers",
    path: "/Customers",
    icon: <BsIcons.BsPersonPlusFill />,
    cName: "nav-text",
  },
  {
    title: "Sellers",
    path: "/Sellers",
    icon: <IoIcons.IoMdPersonAdd />,
    cName: "nav-text",
  },
  {
    title: "Users",
    path: "/Users",
    icon: <BsIcons.BsFillPersonLinesFill />,
    cName: "nav-text",
  },
];
