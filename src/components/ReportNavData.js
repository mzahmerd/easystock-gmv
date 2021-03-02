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
          cName: "report-nav-text",
        },
        {
          title: "Users",
          path: "/Report",
          icon: <IoIcons.IoMdPersonAdd />,
          cName: "report-nav-text",
        },

        {
          title: "Customers",
          path: "/Report",
          icon: <BsIcons.BsPersonPlusFill />,
          cName: "report-nav-text",
        },
        {
          title: "Sellers",
          path: "/Report",
          icon: <IoIcons.IoMdPersonAdd />,
          cName: "report-nav-text",
        },
        {
          title: "Transactions",
          path: "/Report",
          icon: <IoIcons.IoMdCash />,
          cName: "report-nav-text",
        },
        // {
        //   title: "Users",
        //   path: "/Report/Users",
        //   icon: <BsIcons.BsFillPersonLinesFill />,
        //   cName: "report-nav-text",
        // },
      ]
    : [
        {
          title: "Users",
          path: "/Report",
          icon: <IoIcons.IoMdPersonAdd />,
          cName: "report-nav-text",
        },

        {
          title: "Customers",
          path: "/Report",
          icon: <BsIcons.BsPersonPlusFill />,
          cName: "report-nav-text",
        },
      ];
};
