import React from "react";
import { Table } from "react-bootstrap";
import { formatMoney, convertDate } from "../util";

function COTable(props) {
  console.log(props.tableData);
  const renderContent = () => {
    return props.tableData.map((rows, id) => (
      <tr key={id}>
        {/* <td>{rows.createdAt}</td> */}
        <td> {rows.product}</td>
        <td> {rows.qty}</td>
        <td>&#8358; {formatMoney(rows.qty * rows.price)}</td>
        <td> {rows.createdAt ? convertDate(rows.createdAt) : ""} </td>
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

export default COTable;
