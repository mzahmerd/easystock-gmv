import React from "react";
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import * as IoIcons from "react-icons/io";

export const ReportNavData = (isAdmin) => {
  return isAdmin
    ? [
        {
          title: "Sales",
          path: "/Report",
          icon: <FaIcons.FaShoppingCart />,
          cName: "nav-text",
        },
        {
          title: "Users",
          path: "/Report",
          icon: <IoIcons.IoMdPersonAdd />,
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
          path: "/Report",
          icon: <IoIcons.IoMdPersonAdd />,
          cName: "nav-text",
        },
        // {
        //   title: "Users",
        //   path: "/Report/Users",
        //   icon: <BsIcons.BsFillPersonLinesFill />,
        //   cName: "nav-text",
        // },
      ]
    : [
        {
          title: "Users",
          path: "/Report",
          icon: <IoIcons.IoMdPersonAdd />,
          cName: "nav-text",
        },

        {
          title: "Customers",
          path: "/Report",
          icon: <BsIcons.BsPersonPlusFill />,
          cName: "nav-text",
        },
      ];
};
