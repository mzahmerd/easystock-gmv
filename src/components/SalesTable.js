import React from "react";
import { Table } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { formatMoney } from "../util";

function SalesTable(props) {
  const removeItem = (evt) => {
    props.removeItem(props.tableData[evt.target.id]._id);
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
            <td>{rows.name}</td>
            <td>{rows.qty}</td>
            <td>{formatMoney(rows.price)}</td>
            <td>{formatMoney(rows.price * rows.qty)}</td>
            <td>
              <BsTrash color="red" size={20} id={id} onClick={removeItem} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default SalesTable;
