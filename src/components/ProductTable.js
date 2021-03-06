import React from "react";
import { Table } from "react-bootstrap";
import { formatMoney } from "../util";
import { BsTrash } from "react-icons/bs";

function ProductTable(props) {
  const selectProduct = (evt) => {
    props.selectProduct(props.tableData[evt.target.id]);
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
        {props.tableData.map((rows, id) => (
          <tr key={id}>
            <td id={id} onClick={selectProduct}>
              {rows.name}
            </td>
            <td>{rows.qty}</td>
            <td>&#8358; {formatMoney(rows.rate)}</td>
            <td>&#8358; {formatMoney(rows.rate * rows.qty)}</td>
            <td>&#8358; {formatMoney(rows.price)}</td>
            <td>&#8358; {formatMoney(rows.price * rows.qty)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ProductTable;
