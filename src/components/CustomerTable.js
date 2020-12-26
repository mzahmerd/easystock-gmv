import React, { Component } from "react";
import { Table } from "react-bootstrap";

function CustomerTable(props) {
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
            <td>{rows.name}</td>
            <td>{rows.phone}</td>
            <td>{rows.orders}</td>
            <td>{rows.paid}</td>
            <td>{rows.orders - rows.paid}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CustomerTable;
