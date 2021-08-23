import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { formatMoney } from "../../util";

// const borderColor = "#90e5fc";
const borderColor = "#00000";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 20,
    fontSize: 12,
    fontStyle: "bold",
  },
  description: {
    width: "20%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  amount: {
    width: "80%",
    textAlign: "left",
    paddingLeft: 8,
  },
});

const InvoiceTableFooter = ({ total, paid }) => {
  // const total = ;
  // Object.values(items)
  //   .map((item) => item.qty * item.price)
  //   .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  return (
    <>
      <View style={styles.row}>
        <Text style={styles.description}>Total</Text>
        <Text style={styles.amount}>{formatMoney(total)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Paid</Text>
        <Text style={styles.amount}>{formatMoney(paid)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Balance</Text>
        <Text style={styles.amount}>{formatMoney(total - paid)}</Text>
      </View>
    </>
  );
};

export default InvoiceTableFooter;
