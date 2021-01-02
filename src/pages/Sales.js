import React, { Component } from "react";
import { Row, Container, Form, Button, Col } from "react-bootstrap";
import SalesTable from "../components/SalesTable";
import { formatMoney } from "../util";

export default class Sales extends Component {
  state = {
    customers: Object.values(this.props.customers),
    products: Object.values(this.props.products),
    inStore: this.getFirstObj(this.props.products).qty,
    inCart: {},
    customer: this.getFirstObj(this.props.customers).name,
    total: 0,
    product: {
      _id: this.getFirstObj(this.props.products)._id,
      name: this.getFirstObj(this.props.products).name,
      qty: "",
      price: this.getFirstObj(this.props.products).price,
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
    this.setState({
      customer: evt.target.value,
    });
  };

  handleMakeSales = () => {
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
    this.props.makeSales(bill);
  };
  render() {
    // console.log(this.state.products[0]._id);

    const headers = ["Name", "Quantity", "Price", "Total"];

    return (
      <>
        <Container>
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
                    <option key={index} value={s.name}>
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
                <Button className="m-2" onClick={this.addToCart}>
                  Add
                </Button>{" "}
                <Button className="m-2">Remove</Button>
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
                      <Button variant="primary" onClick={this.handleMakeSales}>
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Form>
            </Col>
            <Col className="mb-5 mr-sm-2">
              <SalesTable
                headers={headers}
                tableData={Object.values(this.state.inCart)}
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
