import React, { Component } from "react";
import { Row, Container, Form, Button, Col, Modal } from "react-bootstrap";
import SalesTable from "../components/SalesTable";
import { formatMoney, convertDate } from "../util";
import { Text } from "@react-pdf/renderer";

export default class Sales extends Component {
  state = {
    modalOpen: false,
    saleID: 0,
    customers: Object.values(this.props.customers),
    products: Object.values(this.props.store.products),
    inStore: this.getFirstObj(this.props.store.products).qty,
    inCart: {},
    invoice: {},
    customer: this.getFirstObj(this.props.customers).name,
    lastBalance: this.getFirstObj(this.props.customers).lastBalance,
    balance:
      this.getFirstObj(this.props.customers).orders -
      this.getFirstObj(this.props.customers).paid,

    total: 0,
    product: {
      _id: this.getFirstObj(this.props.store.products)._id,
      name: this.getFirstObj(this.props.store.products).name,
      qty: "",
      price: this.getFirstObj(this.props.store.products).price,
    },
    paid: "",
    credit: "",
  };

  getCredit = (evt) => {
    this.setState({
      paid: evt.target.value,
      credit: this.state.total - evt.target.value,
    });
  };
  getFirstObj(obj) {
    const [first] = Object.keys(obj);
    return obj[first];
  }
  getInStore = (evt) => {
    const selectedIndex = evt.target.options.selectedIndex;
    const id = evt.target.options[selectedIndex].getAttribute("id");
    const { products, product } = this.state;
    // console.log(selectedIndex);

    this.setState({
      inStore: products[id].qty,
      product: {
        ...product,
        name: evt.target.value,
        price: products[id].price,
        _id: products[id]._id,
      },
    });
  };

  addToCart = () => {
    const { inCart, product, total } = this.state;
    let amount = 0;
    if (inCart[product._id]) {
      amount = inCart[product._id].price * inCart[product._id].qty;
    }
    this.setState({
      inCart: {
        ...inCart,
        [product._id]: product,
      },
      total: total + product.price * product.qty - amount,
      product: {
        _id: product._id,
        name: product.name,
        qty: "",
        price: "",
      },
    });
    // console.log(this.state.inCart);
  };
  removeItem = (id) => {
    let items = Object.values(this.state.inCart);
    this.setState({
      inCart: items.filter((item) => item._id !== id),
    });
  };
  updateProduct = (evt) => {
    evt.preventDefault();
    const { product } = this.state;
    this.setState({
      product: {
        ...product,
        [evt.target.name]: evt.target.value,
      },
    });
  };
  updateCustomer = (evt) => {
    const selectedIndex = evt.target.options.selectedIndex;
    const id = evt.target.options[selectedIndex].getAttribute("id");
    const { customers } = this.state;
    this.setState({
      balance: customers[id].orders - customers[id].paid,
      lastBalance: customers[id].lastBalance,
      customer: evt.target.value,
    });
  };

  handleMakeSales = async () => {
    const bill = {
      createdAt: Date.now(),
      user: localStorage.getItem("username"),
      customer: this.state.customer,
      // store: this.state.store,
      total: this.state.total,
      paid: this.state.paid,
      products: Object.values(this.state.inCart),
    };
    // console.log(bill);
    await this.props.makeSales(bill);
    // console.log(invoice);
    this.handleOpen(bill.createdAt);
    // this.setState({
    //   invoice: invoice,
    // });
  };
  handleOpen = (saleID) => {
    this.setState({
      modalOpen: true,
      saleID: saleID,
    });
  };
  handleClose = () => {
    this.setState({
      modalOpen: false,
      saleID: 0,
    });
    this.props.loadData();
    // window.location.reload();
  };
  printInvoice = () => {
    localStorage["saleID"] = this.state.saleID;
    window.location.href = window.location.href.replace("Sales", "Invoice");
  };
  render() {
    const headers = ["Name", "Quantity", "Price", "Total", "Action"];

    return (
      <>
        <Container>
          <Modal show={this.state.modalOpen} onHide={this.handleClose}>
            <Modal.Body>
              <Text> Bill Created Successfully</Text>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.printInvoice}>
                Print Invoice
              </Button>
            </Modal.Footer>
          </Modal>
          <Row style={{ margin: 20 + "px" }}>
            <Col className="mb-2 mr-sm-2" bsPrefix>
              <Form>
                <Form.Control
                  as="select"
                  className="mb-2 mr-sm-2"
                  id="sel_customer"
                  custom
                  name="customer"
                  onChange={this.updateCustomer}
                >
                  {this.state.customers.map((s, index) => (
                    <option key={index} id={index} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control
                  as="select"
                  className="mb-2 mr-sm-2"
                  id="sel_product"
                  custom
                  name="name"
                  onChange={this.getInStore}
                >
                  {this.state.products.map((p, index) => (
                    <option key={index} id={index} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Label htmlFor="in_store" srOnly>
                  In-Store
                </Form.Label>
                <Form.Control
                  disabled
                  className="mb-2 mr-sm-2"
                  id="in_store"
                  placeholder="In-Store"
                  value={formatMoney(this.state.inStore)}
                  onChange={this.updateProduct}
                />
                <Form.Label htmlFor="price" srOnly>
                  Price
                </Form.Label>
                <Form.Control
                  className="mb-2 mr-sm-2"
                  id="price"
                  name="price"
                  placeholder="Price"
                  value={this.state.product.price}
                  onChange={this.updateProduct}
                />
                <Form.Label htmlFor="qty" srOnly>
                  Quantity
                </Form.Label>
                <Form.Control
                  className="mb-2 mr-sm-2"
                  id="qty"
                  name="qty"
                  placeholder="Quantity"
                  value={this.state.product.qty}
                  onChange={this.updateProduct}
                />
                <Button
                  className="m-2"
                  disabled={!this.state.product.qty}
                  onClick={this.addToCart}
                >
                  Add
                </Button>{" "}
                <Container className="mt-lg-5 ml-0">
                  <Row>
                    <Col bsPrefix className=" right-align md-col-right">
                      <Form.Label htmlFor="paid" srOnly>
                        Paid
                      </Form.Label>
                      <Form.Control
                        className="mb-2 mr-sm-2"
                        id="paid"
                        name="paid"
                        value={this.state.paid}
                        onChange={this.getCredit}
                        placeholder="Paid"
                      />
                      <Form.Label htmlFor="credit" srOnly>
                        Credit
                      </Form.Label>
                      <Form.Control
                        className="mb-2 mr-sm-2"
                        id="credit"
                        name="credit"
                        value={formatMoney(this.state.credit)}
                        placeholder="Credit"
                        readOnly={true}
                      />
                      <Button
                        variant="primary"
                        disabled={!this.state.total}
                        onClick={this.handleMakeSales}
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Form>
            </Col>
            <Col className="mb-5 mr-sm-2">
              <Row>
                <Form.Label htmlFor="last_balance">Last Balance</Form.Label>
                <Form.Control
                  disabled
                  className="mb-2 mr-sm-2 "
                  id="last_balance"
                  name="last_balance"
                  value={convertDate(this.state.lastBalance)}
                />
                <Form.Label htmlFor="balance">Balance</Form.Label>
                <Form.Control
                  disabled
                  className="mb-2 mr-sm-2 "
                  id="balance"
                  name="balance"
                  value={formatMoney(this.state.balance)}
                />
              </Row>
              <SalesTable
                headers={headers}
                tableData={Object.values(this.state.inCart)}
                removeItem={this.removeItem}
              ></SalesTable>
              <Form.Label htmlFor="total">Total</Form.Label>
              <Form.Control
                disabled
                className="mb-2 mr-sm-2 "
                id="total"
                name="total"
                value={this.state.total}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
