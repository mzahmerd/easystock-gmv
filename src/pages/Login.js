import React, { Component } from "react";
import { Button, Form, Container } from "react-bootstrap";

export default class Login extends Component {
  state = {
    users: this.props.users,
    user: {
      username: "",
      password: "",
    },
  };

  updateUser = (evt) => {
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [evt.target.name]: evt.target.value,
      },
    });
  };
  handleLogin = () => {
    this.props.login(this.state.user);
  };
  render() {
    return (
      <>
        <Container className="align-center">
          {/* <Row style={{ margin: 10 + "%" }}></Row> */}
          <Form inline style={{ margin: 30 + "%" }}>
            <Form.Label htmlFor="user_name" srOnly>
              User Name
            </Form.Label>
            <Form.Control
              className="mb-2 mr-sm-2"
              id="user_name"
              placeholder="User Name"
              name="username"
              onChange={this.updateUser}
            />
            <Form.Label htmlFor="password" srOnly>
              Phone Number
            </Form.Label>
            <Form.Control
              className="mb-2 mr-sm-2"
              id="password"
              placeholder="Password"
              name="password"
              onChange={this.updateUser}
            />
            <Button
              variant="primary"
              onClick={this.handleLogin}
              className="mb-2"
            >
              Login
            </Button>
          </Form>
        </Container>
      </>
    );
  }
}
