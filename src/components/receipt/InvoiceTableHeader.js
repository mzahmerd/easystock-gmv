import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

// const borderColor = "#90e5fc";
const borderColor = "#0f0f0f";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // borderBottomColor: "#bff0fd",
    borderBottomColor: "#000000",
    backgroundColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  description: {
    width: "30%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  qty: {
    width: "20%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  price: {
    width: "25%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  amount: {
    width: "25%",
  },
});

const InvoiceTableHeader = () => (
  <View style={styles.container}>
    <Text style={styles.description}>Item Description</Text>
    <Text style={styles.qty}>Qty</Text>
    <Text style={styles.price}>Price</Text>
    <Text style={styles.amount}>Amount</Text>
  </View>
);

export default InvoiceTableHeader;
