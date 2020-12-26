import React from "react";
import { Table } from "react-bootstrap";

function SalesTable(props) {
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
        {props.tableData.map((rows, id) => (
          <tr key={id}>
            <td>{rows.name}</td>
            <td>{rows.qty}</td>
            <td>{rows.price}</td>
            <td>{rows.price * rows.qty}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default SalesTable;
