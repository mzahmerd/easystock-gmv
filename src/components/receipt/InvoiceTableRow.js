import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { formatMoney } from "../../util";

// const borderColor = "#90e5fc";
const borderColor = "#000000";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    // borderBottomColor: "#bff0fd",
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
  },
  description: {
    width: "30%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  qty: {
    width: "20%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "center",
    paddingRight: 8,
  },
  price: {
    width: "25%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "center",
    paddingRight: 8,
  },
  amount: {
    width: "25%",
    textAlign: "center",
    paddingRight: 8,
  },
});

const InvoiceTableRow = ({ items }) => {
  const rows = Object.values(items).map((item) => (
    <View style={styles.row} key={item.product}>
      <Text style={styles.description}>{item.product}</Text>
      <Text style={styles.qty}>{item.qty}</Text>
      <Text style={styles.price}>{formatMoney(item.price)}</Text>
      <Text style={styles.amount}>{formatMoney(item.qty * item.price)}</Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default InvoiceTableRow;
