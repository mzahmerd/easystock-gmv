import React, { Component } from "react";
import PRTable from "../components/PRTable";
import COTable from "../components/COTable";
import SOTable from "../components/SOTable";
import USTable from "../components/USTable";

import { Row, Col, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { formatMoney } from "../util";
import ReportNav from "../components/ReportNav";
import CTTable from "../components/CTTable";

export default class Report extends Component {
  state = {
    from: 0,
    to: 0,
    report: "Sales",
    customer: Object.values(this.props.customers)[0].name,
    customerOrders: { items: {}, total: 0, paid: 0 },
    seller: Object.values(this.props.sellers)[0].name,
    sellerOrders: { items: {}, total: 0, paid: 0 },
    user: !this.props.isAdmin
      ? localStorage["username"]
      : Object.values(this.props.users)[0].username,
    userSales: { items: {}, total: 0, paid: 0 },
    deposits: { items: {}, cash: 0, transfer: 0 },
    return: 0,
    selectedItem: {},
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
    if (this.state.report === "Users") {
      return this.usersReport();
    }
    if (this.state.report === "Transactions") {
      return this.depositReport();
    }
  };
  render() {
    // console.log(products);

    return (
      <>
        {this.renderReport()}
        <ReportNav
          isAdmin={this.props.isAdmin}
          switchReport={this.switchReport}
          report={this.state.report}
        />
      </>
    );
  }
  usersReport = () => {
    const headers = [
      "Bill No",
      "Customer",
      "Product",
      "Quantity",
      "Price",
      "Amount",
      "Date",
      "Store",
    ];
    const users = Object.values(this.props.users);
    const updateUser = (evt) => {
      this.setState({
        user: evt.target.value,
      });
    };
    const handleOrderFilter = async () => {
      // console.log(this.state.user);
      const { items, total, paid } = await this.props.getUserSales(
        this.state.user,
        this.state.from,
        this.state.to
      );
      if (items)
        this.setState({
          userSales: {
            items: items,
            total: total,
            paid: paid,
          },
        });
    };
    return !this.props.isAdmin ? (
      <Row style={{ margin: 20 + "px" }}>
        <Col className="mb-5 mr-sm-4" bsPrefix>
          <Form>
            <Form.Control
              as="select"
              className="mb-2 mr-sm-2"
              id="sel_user"
              name="user"
              disabled={!this.props.isAdmin}
              value={localStorage["username"]}
              onChange={updateUser}
            >
              {users.map((s, index) => (
                <option key={index} value={s.username}>
                  {s.username}
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
              value={formatMoney(this.state.userSales.total)}
            />
            <Form.Label htmlFor="credit">Paid</Form.Label>
            <Form.Control
              disabled
              className="mb-2 mr-sm-2"
              id="credit"
              value={formatMoney(this.state.userSales.paid)}
            />
            <Form.Label htmlFor="balance">Balance</Form.Label>
            <Form.Control
              disabled
              className="mb-2 mr-sm-2"
              id="balance"
              value={formatMoney(
                this.state.userSales.total - this.state.userSales.paid
              )}
            />
          </Form>
        </Col>
        <Col className="mb-4 mr-sm-2">
          <USTable
            type="co"
            headers={headers}
            tableData={Object.values(this.state.userSales.items)}
          />
        </Col>
      </Row>
    ) : (
      <Row style={{ margin: 20 + "px" }}>
        <Col className="mb-5 " bsPrefix>
          <Form>
            <Form.Control
              as="select"
              className="mb-2 mr-sm-2"
              id="sel_user"
              name="user"
              disabled={!this.props.isAdmin}
              onChange={updateUser}
            >
              {users.map((s, index) => (
                <option key={index} value={s.username}>
                  {s.username}
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
              className="mb-2 mr-sm-2 "
              id="total_sales"
              value={formatMoney(this.state.userSales.total)}
            />
            <Form.Label htmlFor="credit">Paid</Form.Label>
            <Form.Control
              disabled
              className="mb-2 mr-sm-2 "
              id="credit"
              value={formatMoney(this.state.userSales.paid)}
            />
            <Form.Label htmlFor="balance">Balance</Form.Label>
            <Form.Control
              disabled
              className="mb-2 mr-sm-2 "
              id="balance"
              value={formatMoney(
                this.state.userSales.total - this.state.userSales.paid
              )}
            />
          </Form>
        </Col>
        <Col className="mb-4 mr-sm-2">
          <USTable
            type="co"
            headers={headers}
            tableData={Object.values(this.state.userSales.items)}
          />
        </Col>
      </Row>
    );
  };
  salesReport = () => {
    const headers = ["Product", "Quantity", "Amount"];
    const { items, total, paid } = this.props.sales;
    let products = {};
    // console.log(items);
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
      // console.log(products);
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
    const headers = ["Product", "Quantity", "Price", "Amount", "Date", "Store"];
    const customers = Object.values(this.props.customers);
    const updateCustomer = (evt) => {
      this.setState({
        customer: evt.target.value,
      });
    };
    const updateReturn = (evt) => {
      this.setState({
        return: evt.target.value,
      });
    };
    const handleUpdateReturn = async () => {
      // const {returnQty, selectedItem} = this.state
      // console.log(this.state.selectedItem);
      this.props.returnItem(this.state.selectedItem, this.state.return);
      // item.qty = item.qty - returned;
      // console.log(item);
    };
    const selectItem = async (id) => {
      let item = this.state.customerOrders.items[id];
      this.setState({
        return: item.qty,
        selectedItem: item,
      });
    };
    const handleOrderFilter = async () => {
      const { items, total, paid } = await this.props.getCustomerOrders(
        this.state.customer,
        this.state.from,
        this.state.to
      );

      if (items)
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
          <Form inline className="mt-4">
            <Button
              disabled={!this.state.return}
              className="float-right"
              onClick={handleUpdateReturn}
            >
              Return
            </Button>
            <Form.Control
              className="ml-sm-2"
              id="return"
              onChange={updateReturn}
              value={this.state.return}
            />
          </Form>
        </Col>
        <Col className="mb-4 mr-sm-2">
          <COTable
            type="co"
            headers={headers}
            selectItem={selectItem}
            tableData={Object.values(this.state.customerOrders.items)}
          />
        </Col>
      </Row>
    );
  };
  sellersReport = () => {
    const headers = ["Product", "Quantity", "Rate", "Amount", "Date", "Store"];
    const sellers = Object.values(this.props.sellers);
    const updateSeller = (evt) => {
      this.setState({
        seller: evt.target.value,
      });
    };
    const handleOrderFilter = async () => {
      const { items, total, paid } = await this.props.getSellerOrders(
        this.state.seller,
        this.state.from,
        this.state.to
      );

      this.setState({
        sellerOrders: {
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
              id="sel_seller"
              name="seller"
              onChange={updateSeller}
            >
              {sellers.map((s, index) => (
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
              value={formatMoney(this.state.sellerOrders.total)}
            />
            <Form.Label htmlFor="credit">Paid</Form.Label>
            <Form.Control
              disabled
              className="mb-2 mr-sm-2"
              id="credit"
              value={formatMoney(this.state.sellerOrders.paid)}
            />
            <Form.Label htmlFor="balance">Balance</Form.Label>
            <Form.Control
              disabled
              className="mb-2 mr-sm-2"
              id="balance"
              value={formatMoney(
                this.state.sellerOrders.total - this.state.sellerOrders.paid
              )}
            />
          </Form>
        </Col>
        <Col className="mb-4 mr-sm-2">
          <SOTable
            type="co"
            headers={headers}
            tableData={Object.values(this.state.sellerOrders.items)}
          />
        </Col>
      </Row>
    );
  };
  depositReport = () => {
    const headers = [
      "Customer",
      "Cash",
      "Transfer",
      "Amount",
      "Cashier",
      "Date",
    ];
    const customers = Object.values(this.props.customers);
    const updateCustomer = (evt) => {
      this.setState({
        customer: evt.target.value,
      });
    };
    const handleDepositFilter = async () => {
      const { items, cash, transfer } = await this.props.getDeposits(
        this.state.customer,
        this.state.from,
        this.state.to
      );
      // console.log(deposits);
      if (items)
        this.setState({
          deposits: {
            items: items,
            cash: cash,
            transfer: transfer,
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
            <Button className="float-right" onClick={handleDepositFilter}>
              Search
            </Button>
            <br />
            <br />
            <br />
            <Form.Label htmlFor="total_sales">Total Cash</Form.Label>
            <Form.Control
              disabled
              className="mb-2 mr-sm-2"
              id="total_sales"
              value={formatMoney(this.state.deposits.cash)}
            />
            <Form.Label htmlFor="credit">Total Transfer</Form.Label>
            <Form.Control
              disabled
              className="mb-2 mr-sm-2"
              id="credit"
              value={formatMoney(this.state.deposits.transfer)}
            />
            <Form.Label htmlFor="balance">Total Amount</Form.Label>
            <Form.Control
              disabled
              className="mb-2 mr-sm-2"
              id="balance"
              value={formatMoney(
                this.state.deposits.cash - this.state.deposits.transfer
              )}
            />
          </Form>
        </Col>
        <Col className="mb-4 mr-sm-2">
          <CTTable
            type="ct"
            headers={headers}
            tableData={Object.values(this.state.deposits.items)}
          />
        </Col>
      </Row>
    );
  };
}
