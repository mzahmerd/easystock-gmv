import React, { Component } from "react";
import { Button, Form, Container, Row } from "react-bootstrap";
import ProductTable from "../components/ProductTable";
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

  // const [show, setShow] = useState(false);
  // const handleShow = () => setShow(true);
  // const handleClose = () => setShow(false);
  // const headers = () => ["Name", "Quantity", "Rate", "Total", "Price", "Total"];
  // const products = () => [
  //   {
  //     name: "Fanta",
  //     qty: 300,
  //     rate: 2000,
  //     price: 2500,
  //   },
  //   {
  //     name: "Fanta",
  //     qty: 300,
  //     rate: 2000,
  //     price: 2500,
  //   },
  //   {
  //     name: "Fanta",
  //     qty: 300,
  //     rate: 2000,
  //     price: 2500,
  //   },
  //   {
  //     name: "Fanta",
  //     qty: 300,
  //     rate: 2000,
  //     price: 2500,
  //   },
  // ];
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
    const products = Object.values(this.props.products);
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
              <Button onClick={this.handleAddStore} className="mb-2">
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
              <Button onClick={this.handleAdd} className="mb-2">
                Add Product
              </Button>
            </Form>
          ) : null}
          <ProductTable headers={headers} tableData={products}></ProductTable>
        </Container>
      </>
    );
  }
}
export default Store;
