import React from "react";
import { Table } from "react-bootstrap";
import { formatMoney } from "../util";

function SOTable(props) {
  const renderContent = () => {
    return props.tableData.map((rows, id) => (
      <tr key={id}>
        <td> {rows.product}</td>
        <td> {rows.qty}</td>
        <td>&#8358; {formatMoney(rows.qty * rows.rate)}</td>
      </tr>
    ));
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
      <tbody>{renderContent()}</tbody>
    </Table>
  );
}

export default SOTable;
