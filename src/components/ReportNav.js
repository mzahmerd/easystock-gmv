import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { ReportNavData } from "./ReportNavData";
import "./ReportNav.css";
import { IconContext } from "react-icons";
import StoreModal from "./storeModal";
import { Button, Modal, Form } from "react-bootstrap";

function ReportNav(props) {
  //   const [sidebar, setSidebar] = useState(false);
  //   const [store, setStore] = useState(props.selectedStore);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const { stores } = props;

  const handleSwitch = (evt) => {
    props.switchReport(evt.target.innerText);
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="report-nav">
          {/* <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link> */}
          {/* <h2 style={{ color: "white" }}>{props.selectedStore}</h2> */}

          {/* <Link to="#" className="store-bars">
            <FaIcons.FaStore onClick={handleShow} />
          </Link>
          <Link to="#" className="store-bars">
            <FaIcons.FaStore onClick={handleShow} />
          </Link>
          <Link to="#" className="store-bars">
            <FaIcons.FaStore onClick={handleShow} />
          </Link>
          <Link to="#" className="store-bars">
            <FaIcons.FaStore onClick={handleShow} />
          </Link>
        </div> */}
          {ReportNavData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link onClick={handleSwitch} to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </div>
      </IconContext.Provider>
    </>
  );
}

export default ReportNav;
