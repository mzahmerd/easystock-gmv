import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    margin: 0,
  },
  subtitleContainer: {
    flexDirection: "row",
    marginTop: -12,
  },
  detailsContainer: {
    flexDirection: "row",
    marginTop: -4,
  },
  addressContainer: {
    flexDirection: "row",
    marginTop: -2,
  },
  phoneContainer: {
    flexDirection: "row",
    marginTop: 0,
  },
  titleText: {
    color: "#000000",
    letterSpacing: 4,
    fontSize: 22,
    textAlign: "center",
    textTransform: "uppercase",
  },
  subtitleText: {
    color: "#000000",
    // letterSpacing: 4,
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase",
  },
  detailsText: {
    color: "#000000",
    // letterSpacing: 4,
    fontSize: 8,
    textAlign: "center",
    textTransform: "uppercase",
  },
  addressText: {
    color: "#000000",
    // letterSpacing: 4,
    fontSize: 8,
    textAlign: "center",
    textTransform: "uppercase",
  },
  phoneText: {
    color: "#000000",
    // letterSpacing: 4,
    fontSize: 8,
    textAlign: "center",
    textTransform: "uppercase",
  },
});

const InvoiceHead = ({ title, subtitle, details, address, phone }) => (
  <>
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
    <View style={styles.subtitleContainer}>
      <Text style={styles.subtitleText}>{subtitle}</Text>
    </View>
    <View style={styles.detailsContainer}>
      <Text style={styles.detailsText}>{details}</Text>
    </View>
    <View style={styles.addressContainer}>
      <Text style={styles.addressText}>{address}</Text>
    </View>
    <View style={styles.phoneContainer}>
      <Text style={styles.phoneText}>{phone}</Text>
    </View>
  </>
);

export default InvoiceHead;
