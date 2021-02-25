import React, { Component } from "react";
import { Button, Form, Container, Row } from "react-bootstrap";
import CustomerTable from "../components/CustomerTable";

export default class Customers extends Component {
  state = {
    customers: this.props.customers,
    customer: {
      name: "",
      phone: "",
      paid: 0,
      orders: 0,
    },
    selectedCustomer: "",
    cash: 0,
    transfer: 0,
  };

  updateCustomer = (evt) => {
    const { customer } = this.state;
    this.setState({
      customer: {
        ...customer,
        [evt.target.name]: evt.target.value,
      },
    });
  };
  handleAddCustomer = () => {
    this.props.addCustomer(this.state.customer);
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
  selectCustomer = (id) => {
    this.setState({
      selectedCustomer: this.state.customers[id],
    });
    // console.log(this.state.customers[id]);
  };
  handleAddDeposit = () => {
    // console.log("customer" + this.state.selectedCustomer);
    this.props.addDeposit(
      this.state.cash,
      this.state.transfer,
      this.state.selectedCustomer
    );
  };
  render() {
    this.headers = ["Name", "Phone", "Orders", "Paid", "Credit"];
    return (
      <>
        <Container>
          <Row style={{ margin: 20 + "px" }}></Row>
          <Form inline>
            <Form.Label htmlFor="customer_name" srOnly>
              Customer Name
            </Form.Label>
            <Form.Control
              className="mb-2 mr-sm-2"
              id="customer_name"
              placeholder="Customer Name"
              name="name"
              onChange={this.updateCustomer}
            />
            <Form.Label htmlFor="phone_number" srOnly>
              Phone Number
            </Form.Label>
            <Form.Control
              className="mb-2 mr-sm-2"
              id="phone_number"
              placeholder="Phone Number"
              name="phone"
              onChange={this.updateCustomer}
            />
            <Button
              variant="primary"
              disabled={!this.state.customer.name}
              onClick={this.handleAddCustomer}
              className="mb-2"
            >
              Add
            </Button>
          </Form>
          <CustomerTable
            headers={this.headers}
            tableData={Object.values(this.props.customers)}
            selectCustomer={this.selectCustomer}
          ></CustomerTable>
          <div>
            <Form inline>
              <Form.Label>{this.state.selectedCustomer.name}</Form.Label>
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
                disabled={!(this.state.cash || this.state.transfer)}
                onClick={this.handleAddDeposit}
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
