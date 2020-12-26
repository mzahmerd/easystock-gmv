import React, { Component } from "react";
import PRTable from "../components/PRTable";
import COTable from "../components/COTable";
import SOTable from "../components/SOTable";
import { Row, Col, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { formatMoney } from "../util";
import ReportNav from "../components/ReportNav";

export default class Report extends Component {
  state = {
    from: null,
    to: null,
    report: "Sales",
    customer: "",
    customerOrders: { items: {}, total: 0, paid: 0 },
  };

  switchReport = (report) => {
    this.setState({
      report: report,
    });
    // console.log(report);
  };
  handleSalesFilter = () => {
    this.props.getSalesByDate(this.state.from, this.state.to);
  };

  renderReport = () => {
    if (this.state.report === "Sales") {
      return this.salesReport();
    }
    if (this.state.report === "Customers") {
      return this.customersReport();
    }
    if (this.state.report === "Sellers") {
      return this.sellersReport();
    }
  };
  render() {
    // console.log(products);

    return (
      <>
        {this.renderReport()}
        <ReportNav switchReport={this.switchReport} />
      </>
    );
  }

  salesReport = () => {
    const headers = ["Product", "Quantity", "Amount"];
    const { items, total, paid } = this.props.sales;
    let products = {};
    items.map((p) => {
      if (!products[p.product]) {
        products[p.product] = {
          product: p.product,
          qty: Number.parseInt(p.qty),
          amount: p.price * p.qty,
        };
      } else {
        products = {
          ...products,
          [p.product]: {
            product: p.product,
            qty:
              Number.parseInt(products[p.product].qty) + Number.parseInt(p.qty),
            amount: products[p.product].amount + p.qty * p.price,
          },
        };
      }
    });

    return (
      <Row style={{ margin: 20 + "px" }}>
        <Col className="mb-5 mr-sm-4" bsPrefix>
          <Form>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={this.state.from}
              onChange={(date) => this.setState({ from: date })}
            />{" "}
            <br />
            <br />
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={this.state.to}
              onChange={(date) => this.setState({ to: date })}
            />
            <br />
            <br />
            <Button className="float-right" onClick={this.handleSalesFilter}>
              Search
            </Button>
            <br />
            <br />
            <br />
            <Form.Label htmlFor="total_sales">Total Sales</Form.Label>
            <Form.Control
              disabled
              className="mb-2 mr-sm-2"
              id="total_sales"
              value={formatMoney(total)}
            />
            <Form.Label htmlFor="credit">Credit</Form.Label>
            <Form.Control
              disabled
              className="mb-2 mr-sm-2"
              id="credit"
              value={formatMoney(total - paid)}
            />
            <Form.Label htmlFor="balance">Balance</Form.Label>
            <Form.Control
              disabled
              className="mb-2 mr-sm-2"
              id="balance"
              value={formatMoney(paid)}
            />
          </Form>
        </Col>
        <Col className="mb-4 mr-sm-2">
          <PRTable
            type="sr"
            headers={headers}
            tableData={Object.values(products)}
          />
        </Col>
      </Row>
    );
  };
  customersReport = () => {
    const headers = [ "Product", "Quantity", "Amount", "Date"];
    const customers = Object.values(this.props.customers);

    // console.log(items);

    let products = {};
    // items.map((p) => {
    //   if (!products[p.product]) {
    //     products[p.product] = {
    //       product: p.product,
    //       qty: Number.parseInt(p.qty),
    //       amount: p.price * p.qty,
    //     };
    //   } else {
    //     products = {
    //       ...products,
    //       [p.product]: {
    //         product: p.product,
    //         qty:
    //           Number.parseInt(products[p.product].qty) + Number.parseInt(p.qty),
    //         amount: products[p.product].amount + p.qty * p.price,
    //       },
    //     };
    //   }
    // });
    const updateCustomer = (evt) => {
      this.setState({
        customer: evt.target.value,
      });
    };
    const handleOrderFilter = async () => {
      const { items, total, paid } = await this.props.getCustomerOrders(
        this.state.customer,
        this.state.from,
        this.state.to
      );

      // console.log(items);
      this.setState({
        customerOrders: {
          items: items,
          total: total,
          paid: paid,
        },
      });
    };
    return (
      <Row style={{ margin: 20 + "px" }}>
        <Col className="mb-5 mr-sm-4" bsPrefix>
          <Form>
            <Form.Control
              as="select"
              className="mb-2 mr-sm-2"
              id="sel_customer"
              custom
              name="customer"
              onChange={updateCustomer}
            >
              {customers.map((s, index) => (
                <option key={index} value={s.name}>
                  {s.name}
                </option>
              ))}
            </Form.Control>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={this.state.from}
              onChange={(date) => this.setState({ from: date })}
            />{" "}
            <br />
            <br />
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={this.state.to}
              onChange={(date) => this.setState({ to: date })}
            />
            <br />
            <br />
            <Button className="float-right" onClick={handleOrderFilter}>
              Search
            </Button>
            <br />
            <br />
            <br />
            <Form.Label htmlFor="total_sales">Total Sales</Form.Label>
            <Form.Control
              disabled
              className="mb-2 mr-sm-2"
              id="total_sales"
              value={formatMoney(this.state.customerOrders.total)}
            />
            <Form.Label htmlFor="credit">Paid</Form.Label>
            <Form.Control
              disabled
              className="mb-2 mr-sm-2"
              id="credit"
              value={formatMoney(this.state.customerOrders.paid)}
            />
            <Form.Label htmlFor="balance">Balance</Form.Label>
            <Form.Control
              disabled
              className="mb-2 mr-sm-2"
              id="balance"
              value={formatMoney(
                this.state.customerOrders.total - this.state.customerOrders.paid
              )}
            />
          </Form>
        </Col>
        <Col className="mb-4 mr-sm-2">
          <COTable
            type="co"
            headers={headers}
            tableData={Object.values(this.state.customerOrders.items)}
          />
        </Col>
      </Row>
    );
  };
  sellersReport = () => {
    const headers = ["Product", "Quantity", "Amount"];
    const { items, total, paid } = this.props.sales;
    let products = {};
    console.log(items);
    items.map((p) => {
      if (!products[p.product]) {
        products[p.product] = {
          product: p.product,
          qty: Number.parseInt(p.qty),
          amount: p.price * p.qty,
        };
      } else {
        products = {
          ...products,
          [p.product]: {
            product: p.product,
            qty:
              Number.parseInt(products[p.product].qty) + Number.parseInt(p.qty),
            amount: products[p.product].amount + p.qty * p.price,
          },
        };
      }
    });

    return (
      <Row style={{ margin: 20 + "px" }}>
        <Col className="mb-5 mr-sm-4" bsPrefix>
          <Form>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={this.state.from}
              onChange={(date) => this.setState({ from: date })}
            />{" "}
            <br />
            <br />
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={this.state.to}
              onChange={(date) => this.setState({ to: date })}
            />
            <br />
            <br />
            <Button className="float-right" onClick={this.handleSalesFilter}>
              Search
            </Button>
            <br />
            <br />
            <br />
            <Form.Label htmlFor="total_sales">Total Sales</Form.Label>
            <Form.Control
              disabled
              className="mb-2 mr-sm-2"
              id="total_sales"
              value={formatMoney(total)}
            />
            <Form.Label htmlFor="credit">Credit</Form.Label>
            <Form.Control
              disabled
              className="mb-2 mr-sm-2"
              id="credit"
              value={formatMoney(total - paid)}
            />
            <Form.Label htmlFor="balance">Balance</Form.Label>
            <Form.Control
              disabled
              className="mb-2 mr-sm-2"
              id="balance"
              value={formatMoney(paid)}
            />
          </Form>
        </Col>
        <Col className="mb-4 mr-sm-2">
          <SOTable
            type="so"
            headers={headers}
            tableData={Object.values(products)}
          />
        </Col>
      </Row>
    );
  };
}
