import React, { Component } from "react";
import { Button, Form, Container, Row } from "react-bootstrap";
import CustomerTable from "../components/CustomerTable";
import { formatMoney } from "../util";

export default class Sellers extends Component {
  state = {
    sellers: this.props.sellers.items,
    seller: {
      name: "",
      phone: "",
      paid: 0,
      orders: 0,
    },
    selectedSeller: "",
    cash: 0,
    transfer: 0,
  };

  updateSeller = (evt) => {
    const { seller } = this.state;
    this.setState({
      seller: {
        ...seller,
        [evt.target.name]: evt.target.value,
      },
    });
  };
  handleAddSeller = () => {
    this.props.addSeller(this.state.seller);
  };
  handleUpdateSeller = () => {
    if (this.state.seller._id) {
      this.props.updateSellerName(this.state.seller);
    } else {
      alert(
        "seller not selected, click on name of the seller you want to update"
      );
    }
  };
  updateCash = (evt) => {
    this.setState({
      cash: evt.target.value,
    });
  };
  updateTransfer = (evt) => {
    this.setState({
      transfer: evt.target.value,
    });
  };
  selectSeller = (id) => {
    this.setState({
      selectedSeller: this.state.sellers[id],
      seller: this.state.sellers[id],
    });
  };
  handleAddWithdrawl = () => {
    // console.log("customer" + this.state.selectedCustomer);
    this.props.addWithdrawal(
      this.state.cash,
      this.state.transfer,
      this.state.selectedSeller
    );
  };
  render() {
    this.headers = ["Name", "Phone", "Orders", "Paid", "Credit"];
    return (
      <>
        <Container>
          <Row style={{ margin: 20 + "px" }}></Row>
          <Form inline>
            <Form.Label htmlFor="seller_name" srOnly>
              Seller Name
            </Form.Label>
            <Form.Control
              className="mb-2 mr-sm-2"
              id="seller_name"
              placeholder="Seller Name"
              name="name"
              value={this.state.seller.name}
              onChange={this.updateSeller}
            />
            <Form.Label htmlFor="phone_number" srOnly>
              Phone Number
            </Form.Label>
            <Form.Control
              className="mb-2 mr-sm-2"
              id="phone_number"
              placeholder="Phone Number"
              name="phone"
              value={this.state.seller.phone}
              onChange={this.updateSeller}
            />
            <Button
              variant="primary"
              disabled={!this.state.seller.name}
              onClick={this.handleAddSeller}
              className="mb-2"
            >
              Add
            </Button>
            <Button
              variant="primary"
              disabled={!this.state.seller.name}
              onClick={this.handleUpdateSeller}
              className="mb-2 ml-2"
            >
              Update
            </Button>
          </Form>
          <CustomerTable
            headers={this.headers}
            tableData={Object.values(this.props.sellers.items)}
            selectCustomer={this.selectSeller}
          ></CustomerTable>
          <div>
            <Form inline>
              <Form.Label htmlFor="total_credit">Total Credit</Form.Label>
              <Form.Control
                disabled
                className="mb-2 mr-sm-2"
                id="total_credit"
                // name="store"
                value={formatMoney(this.props.sellers.totalCredit)}
              />
            </Form>
            <Form inline>
              <Form.Label>{this.state.selectedSeller.name}</Form.Label>
              <br />
              {/* <Form.Label htmlFor="cash">Cash</Form.Label> */}
              <Form.Control
                className="mb-2 mr-sm-2"
                id="cash"
                placeholder="Cash"
                name="cash"
                value={this.state.cash}
                onChange={this.updateCash}
              />
              <Form.Label htmlFor="transfer">Transfer</Form.Label>
              <Form.Control
                className="mb-2 mr-sm-2"
                id="transfer"
                placeholder="Transfer"
                name="transfer"
                value={this.state.transfer}
                onChange={this.updateTransfer}
              />
              <Button
                variant="primary"
                onClick={this.handleAddWithdrawl}
                disabled={!(this.state.cash || this.state.transfer)}
                className="mb-2"
              >
                Deposit
              </Button>
            </Form>
          </div>
        </Container>
      </>
    );
  }
}
