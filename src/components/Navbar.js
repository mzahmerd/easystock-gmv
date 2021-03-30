import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { getSidebarData } from "./SidebarData";
import "./Nabvar.css";
import { IconContext } from "react-icons";
import { Button, Modal, Form } from "react-bootstrap";

function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);
  const [store, setStore] = useState(props.selectedStore);
  const [billNo, setBillNo] = useState(0);
  const showSidebar = () => setSidebar(!sidebar);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [showPrint, setShowPrint] = useState(false);
  const handleShowPrint = () => setShowPrint(true);
  const handleClosePrint = () => setShowPrint(false);

  const { stores } = props;
  // console.log(stores);
  const handleChangeStore = (evt) => setStore(evt.target.value);
  const handleChangeBillNo = (evt) => setBillNo(evt.target.value);
  const switchStore = () => {
    // console.log(store);
    localStorage["store"] = store;
    props.changeStore(store);
    handleClose();
  };
  const printInvoice = () => {
    localStorage["saleID"] = billNo;
    // console.log(window.location.host + "/Invoice");
    window.location.href = "https://" + window.location.host + "/Invoice";
  };

  const logout = () => {
    localStorage.clear();
    props.logout();
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Change Store </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form inline>
            <Form.Control
              as="select"
              className="mb-2 mr-sm-2"
              id="inlineFormCustomSelectPref"
              custom
              name="store"
              defaultValue={props.selectedStore}
              onChange={handleChangeStore}
            >
              {stores.map((s) => (
                <option key={s._id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </Form.Control>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={switchStore}>
            Switch
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showPrint} onHide={handleClosePrint}>
        <Modal.Header closeButton>
          <Modal.Title> Input Bill No </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form inline>
            <Form.Control
              className="mb-2 mr-sm-2"
              id="bill_no"
              name="bill_no"
              value={billNo}
              onChange={handleChangeBillNo}
              placeholder="Bill No"
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePrint}>
            Close
          </Button>
          <Button variant="primary" onClick={printInvoice}>
            Print
          </Button>
        </Modal.Footer>
      </Modal>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <h2 className="dummy-store">{props.selectedStore}</h2>

          <Link to="#" className="store-bars">
            <FaIcons.FaPrint onClick={handleShowPrint} />
          </Link>
          <Link to="#" className="store-bars">
            <FaIcons.FaStore onClick={handleShow} />
          </Link>
          <h2 style={{ color: "white" }}>{props.selectedStore}</h2>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="nav-bar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {getSidebarData(props.isAdmin).map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link
                    to={item.path}
                    className={
                      window.location.pathname === item.path ? "active" : ""
                    }
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li key="logout" className="Logout">
              <Link to="/" onClick={logout} className="float-right mr-4">
                <AiIcons.AiOutlineLogout />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
