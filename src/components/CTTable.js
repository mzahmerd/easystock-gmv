import React from "react";
import { Table } from "react-bootstrap";
import { formatMoney, convertDate } from "../util";

function CTTable(props) {
  const renderContent = () => {
    console.log(props.tableData);
    return props.tableData.map((rows, id) => (
      <tr key={id}>
        <td> {rows.customer}</td>
        <td>&#8358; {formatMoney(rows.cash)}</td>
        <td>&#8358; {formatMoney(rows.transfer)}</td>
        <td>&#8358; {formatMoney(rows.cash + rows.transfer)}</td>
        <td>{rows.cashier}</td>
        <td>{convertDate(rows.createdAt)}</td>
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

export default CTTable;
