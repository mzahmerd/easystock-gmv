import React, { Component } from "react";
import { Table } from "react-bootstrap";

function UserTable(props) {
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
            <td>{rows.password}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default UserTable;
