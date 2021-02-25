import React from "react";
import { Table } from "react-bootstrap";
import { formatMoney, convertDate } from "../util";

function USTable(props) {
  const renderContent = () => {
    return props.tableData.map((rows, id) => (
      <tr key={id}>
        <td> {rows.createdAt}</td>
        <td> {rows.customer}</td>
        <td> {rows.product}</td>
        <td> {rows.qty}</td>
        <td> {rows.price}</td>
        <td>&#8358; {formatMoney(rows.qty * rows.price)}</td>
        <td> {rows.createdAt ? convertDate(rows.createdAt) : ""} </td>
        <td> {rows.store}</td>
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

export default USTable;
