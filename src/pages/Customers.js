import React, { Component } from "react";
import { Button, Form, Table, Container, Row } from "react-bootstrap";
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
              onClick={this.handleAddCustomer}
              className="mb-2"
            >
              Add
            </Button>
          </Form>
          <CustomerTable
            headers={this.headers}
            tableData={Object.values(this.props.customers)}
          ></CustomerTable>
        </Container>
      </>
    );
  }
}
