import React, { Component } from "react";
import { Button, Form, Container } from "react-bootstrap";

export default class Login extends Component {
  state = {
    users: this.props.users,
    user: {
      username: "",
      password: "",
    },
    passcode: "",
    newUser: false,
  };
  hidePassword = (password) => {
    let text = "";
    for (let i = 0; i < password.length; i++) {
      text += "*";
    }
    return text;
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
  updateCode = (evt) => {
    this.setState({
      passcode: evt.target.value,
    });
  };
  handleLogin = () => {
    this.props.login(this.state.user);
  };
  handleRegister = () => {
    this.props.register(this.state.user, this.state.passcode);
  };
  handleNewUser = () => {
    this.setState({
      newUser: !this.state.newUser,
    });
  };
  CodeField = () => {
    if (this.state.newUser) {
      return (
        <>
          <Form.Label htmlFor="passcode" srOnly>
            Passcode
          </Form.Label>
          <Form.Control
            className="mb-2 mr-sm-2"
            id="passcode"
            placeholder="Passcode"
            name="passcode"
            onChange={this.updateCode}
          />
        </>
      );
    }
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
              Password
            </Form.Label>
            <Form.Control
              className="mb-2 mr-sm-2"
              id="password"
              placeholder="Password"
              name="password"
              value={this.hidePassword(this.state.user.password)}
              onChange={this.updateUser}
            />
            {this.CodeField()}
            <Form.Check label="new user" onChange={this.handleNewUser} />
            <Button
              variant="primary"
              onClick={
                this.state.newUser ? this.handleRegister : this.handleLogin
              }
              className="mb-2"
            >
              {this.state.newUser ? "Register" : "Login"}
            </Button>
          </Form>
        </Container>
      </>
    );
  }
}
