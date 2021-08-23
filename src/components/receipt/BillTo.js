import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { convertDate } from "../../util";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 4,
  },
  billTo: {
    fontFamily: "Helvetica-Oblique",
  },
});

const BillTo = ({ invoice }) => (
  <View style={styles.headerContainer}>
    <Text>Bill No: {invoice.billNo}</Text>
    <Text>Cashier: {invoice.cashier}</Text>
    <Text>Customer: {invoice.customer}</Text>
    <Text>Date: {convertDate(invoice.createdAt)}</Text>
  </View>
);

export default BillTo;
