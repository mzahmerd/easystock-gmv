import React, { Component } from "react";
import { Button, Form, Container, Row } from "react-bootstrap";
import ProductTable from "../components/ProductTable";
import { formatMoney } from "../util";
// const [state, setstate] = useState(true);

class Store extends Component {
  state = {
    // products: this.props.products,
    // stores: this.props.stores,
    // headers: ["Name", "Quantity", "Rate", "Total", "Price", "Total"],
    product: {
      name: "",
      qty: 0,
      rate: 0,
      price: 0,
    },
    store: "",
  };

  updateProductDetals = (evt) => {
    const { product } = this.state;
    this.setState({
      product: {
        ...product,
        [evt.target.name]: evt.target.value,
      },
    });
    // console.log(product);
  };
  handleAdd = () => {
    this.props.addProduct(this.state.product);
  };
  handleAddStore = () => {
    this.props.addStore(this.state.store);
  };
  setStoreName = (evt) => {
    this.setState({
      store: evt.target.value,
    });
  };
  filterProduct = () => {
    // window.location.href = "/" + e.target.value;
  };
  render() {
    const products = Object.values(this.props.store.products);
    const headers = ["Name", "Quantity", "Rate", "Total", "Price", "Total"];
    // console.log(products);
    return (
      <>
        <Container>
          <Row style={{ margin: 20 + "px" }}></Row>
          {this.props.isAdmin ? (
            <Form inline>
              <Form.Label htmlFor="inlineFormInputGroupUsername2" srOnly>
                Store Name
              </Form.Label>
              <Form.Control
                className="mb-2 mr-sm-2"
                id="inlineFormInputName2"
                // name="store"
                value={this.state.store}
                placeholder="Store name"
                onChange={this.setStoreName}
              />

              <Button
                onClick={this.handleAddStore}
                disabled={!this.state.store}
                className="mb-2"
              >
                Add Store
              </Button>
              <Form.Label htmlFor="product_name" srOnly>
                Product Name
              </Form.Label>
              <Form.Control
                className=" align-content-end mb-2 mr-sm-2"
                id="product_name"
                value={this.state.product.name}
                name="name"
                onChange={this.updateProductDetals}
                placeholder="product name"
              />
              <Button
                onClick={this.handleAdd}
                disabled={!this.state.product.name}
                className="mb-2"
              >
                Add Product
              </Button>
            </Form>
          ) : null}
          <ProductTable headers={headers} tableData={products}></ProductTable>
          <Form inline>
            <Form.Label htmlFor="total_rate">Total Rate</Form.Label>
            <Form.Control
              disabled
              className="mb-2 mr-sm-2"
              id="total_rate"
              // name="store"
              value={formatMoney(this.props.store.totalRate)}
              placeholder="Total Rate"
            />
            <Form.Label htmlFor="total_amount">Total Amount</Form.Label>
            <Form.Control
              disabled
              className="mb-2 mr-sm-2"
              id="total_amount"
              // name="store"
              value={formatMoney(this.props.store.totalAmount)}
              placeholder="Total Amount"
            />
          </Form>
        </Container>
      </>
    );
  }
}
export default Store;
