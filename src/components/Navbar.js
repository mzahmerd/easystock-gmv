import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import "./Nabvar.css";
import { IconContext } from "react-icons";
import StoreModal from "./storeModal";
import { Button, Modal, Form } from "react-bootstrap";

function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);
  const [store, setStore] = useState(props.selectedStore);
  const showSidebar = () => setSidebar(!sidebar);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const { stores } = props;
  // console.log(stores);
  const handleChangeStore = (evt) => setStore(evt.target.value);

  const switchStore = () => {
    // console.log(store);
    props.changeStore(store);
    handleClose();
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
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <h2 style={{ color: "white" }}>{props.selectedStore}</h2>

          <Link to="#" className="store-bars">
            <FaIcons.FaStore onClick={handleShow} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="nav-bar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
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

export default Navbar;
