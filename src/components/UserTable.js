import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { FaEye } from "react-icons/fa";

function UserTable(props) {
  const [show, setShow] = useState(false);

  const changePasswordVisibility = () => {
    setShow(!show);
  };
  const hidePassword = (password) => {
    let text = "";
    for (let i = 0; i < password.length; i++) {
      text += "*";
    }
    return text;
  };
  return (
    <Table responsive>
      <thead>
        <tr>
          {props.headers.map((data, index) => (
            <th key={index}>{data}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.tableData.map((rows) => (
          <tr key={rows._id}>
            <td>{rows.username}</td>
            <td>
              {show ? rows.password : hidePassword(rows.password)}
              <FaEye onClick={changePasswordVisibility} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default UserTable;
