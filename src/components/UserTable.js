import React, { useState } from "react";
import { Table } from "react-bootstrap";

function UserTable(props) {
  const [show, setShow] = useState("");

  const changePasswordVisibility = (evt) => {
    setShow(evt.target.id !== show ? evt.target.id : "");
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
            <td id={rows.username} onClick={changePasswordVisibility}>
              {rows.username}
            </td>
            <td>
              {show === rows.username
                ? rows.password
                : hidePassword(rows.password)}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default UserTable;
