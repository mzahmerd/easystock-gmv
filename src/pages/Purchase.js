import React, { Component } from "react";
import { Row, Container, Form, Button, Col } from "react-bootstrap";
import ProductTable from "../components/ProductTable";
import PurchaseTable from "../components/PurchaseTable";
import { formatMoney, convertDate } from "../util";

export default class Purchase extends Component {
  state = {
    sellers: Object.values(this.props.sellers),
    products: Object.values(this.props.products),
    inStore: this.getFirstObj(this.props.products).qty,
    inCart: {},
    seller: this.getFirstObj(this.props.sellers).name,
    total: 0,
    product: {
      _id: this.getFirstObj(this.props.products)._id,
      name: this.getFirstObj(this.props.products).name,
      qty: "",
      rate: "",
      price: "",
    },
    paid: "",
    credit: "",
    lastBalance: this.getFirstObj(this.props.sellers).lastBalance,
    balance:
      this.getFirstObj(this.props.sellers).orders -
      this.getFirstObj(this.props.sellers).paid,
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
        rate: products[id].rate,
        price: products[id].price,
        _id: products[id]._id,
      },
    });
  };

  addToCart = () => {
    const { inCart, product, total } = this.state;
    let amount = 0;
    if (inCart[product._id]) {
      amount = inCart[product._id].rate * inCart[product._id].qty;
    }
    this.setState({
      inCart: {
        ...inCart,
        [product._id]: product,
      },
      total: total + product.rate * product.qty - amount,
      product: {
        _id: product._id,
        name: product.name,
        qty: "",
        rate: "",
        price: "",
      },
    });
    // console.log(this.state.inCart);
  };
  removeItem = (id) => {
    let items = Object.values(this.state.inCart);
    // let total = this.state.total;
    // total -= this.state.inCart[id].qty + this.state.inCart[id].rate;
    this.setState({
      inCart: items.filter((item) => item._id !== id),
      // total: total,
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
  updateSeller = (evt) => {
    const selectedIndex = evt.target.options.selectedIndex;
    const id = evt.target.options[selectedIndex].getAttribute("id");
    const { sellers } = this.state;
    this.setState({
      lastBalance: sellers[id].orders - sellers[id].paid,
      seller: evt.target.value,
    });
  };

  handleMakePurchase = () => {
    const bill = {
      createdAt: Date.now(),
      seller: this.state.seller,
      // store: this.state.store,
      total: this.state.total,
      paid: this.state.paid,
      products: Object.values(this.state.inCart),
    };
    // console.log(bill);
    this.props.makePurchase(bill);
  };
  render() {
    // console.log(this.state.products[0]._id);

    const headers = [
      "Name",
      "Quantity",
      "Rate",
      "Total",
      "Price",
      "Total",
      "Action",
    ];

    return (
      <>
        <Container>
          <Row style={{ margin: 20 + "px" }}>
            <Col className="mb-2 mr-sm-2" bsPrefix>
              <Form>
                <Form.Control
                  as="select"
                  className="mb-2 mr-sm-2"
                  id="sel_seller"
                  custom
                  name="seller"
                  onChange={this.updateSeller}
                >
                  {this.state.sellers.map((s, index) => (
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
                  value={this.state.inStore}
                  onChange={this.updateProduct}
                />
                <Form.Label htmlFor="rate" srOnly>
                  Rate
                </Form.Label>
                <Form.Control
                  className="mb-2 mr-sm-2"
                  id="rate"
                  name="rate"
                  placeholder="Rate"
                  value={this.state.product.rate}
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
                        value={this.state.credit}
                        placeholder="Credit"
                        readOnly={true}
                      />
                      <Button
                        variant="primary"
                        disabled={!this.state.total}
                        onClick={this.handleMakePurchase}
                      >
                        Save
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
              <PurchaseTable
                headers={headers}
                tableData={Object.values(this.state.inCart)}
                removeItem={this.removeItem}
              ></PurchaseTable>
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
