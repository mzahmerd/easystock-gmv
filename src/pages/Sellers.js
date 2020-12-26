import React, { Component } from "react";
import { Button, Form, Container, Row } from "react-bootstrap";
import CustomerTable from "../components/CustomerTable";

export default class Sellers extends Component {
  state = {
    sellers: this.props.sellers,
    seller: {
      name: "",
      phone: "",
      paid: 0,
      orders: 0,
    },
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
              onChange={this.updateSeller}
            />
            <Button
              variant="primary"
              onClick={this.handleAddSeller}
              className="mb-2"
            >
              Add
            </Button>
          </Form>
          <CustomerTable
            headers={this.headers}
            tableData={Object.values(this.props.sellers)}
          ></CustomerTable>
        </Container>
      </>
    );
  }
}
