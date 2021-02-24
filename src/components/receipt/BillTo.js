import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 36,
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
});

const BillTo = ({ invoice }) => (
  <View style={styles.headerContainer}>
    <Text>Bill No: {invoice.company}</Text>
    <Text>Customer: {invoice.company}</Text>
    <Text>Cashier: {invoice.company}</Text>
    <Text>Time: {invoice.company}</Text>
  </View>
);

export default BillTo;
