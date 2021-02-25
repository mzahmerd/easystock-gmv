import React, { Component, Fragment } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Invoice from "../components/receipt/Invoice";

export default class MyInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice: {
        customer: "",
        createdAt: 0,
        billNo: 0,
        total: 0,
        paid: 0,
        items: [],
      },
    };
  }

  componentDidMount = async () => {
    // // Correct
    // this.setState(async (state, props) => ({
    //   invoice: await props.getInvoice(localStorage["saleID"]),
    // }));
    this.setState({
      invoice: await this.props.getInvoice(localStorage["saleID"]),
    });
    // console.log(await this.props.getInvoice(localStorage["saleID"]));
  };
  render() {
    // let saleID = localStorage["saleID"];
    // const invoice = this.props.getInvoice(saleID);
    // console.log(this.state.invoice);
    return (
      <Fragment>
        <PDFViewer width="1000" height="600" className="app">
          <Invoice invoice={this.state.invoice} />
        </PDFViewer>
      </Fragment>
    );
  }
}
