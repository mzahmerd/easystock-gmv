import React, { Component } from "react";
import { Button, Form, Container, Row } from "react-bootstrap";
import UserTable from "../components/UserTable";

export default class Users extends Component {
  state = {
    users: this.props.users,
    user: {
      username: "",
      password: "",
    },
    passwordText: "",
  };

  updateUsername = (evt) => {
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        username: evt.target.value,
      },
    });
    // this.updatePasswordText(user.password.length);
  };
  updatePasswordText = (evt) => {
    const password = evt.target.value;
    const { user } = this.state;
    let text = "";
    for (let i = 0; i < password.length; i++) {
      text += "*";
    }
    this.setState((state, props) => {
      return {
        user: {
          ...user,
          password: password,
        },
        passwordText: text,
      };
    });
  };
  handleAddUser = () => {
    // console.log(this.state.user);
    this.props.addUser(this.state.user);
  };
  render() {
    this.headers = ["Username", "Password"];
    // console.log(this.state.users);
    return (
      <>
        <Container>
          <Row style={{ margin: 20 + "px" }}></Row>
          <Form inline>
            <Form.Label htmlFor="user_name" srOnly>
              User Name
            </Form.Label>
            <Form.Control
              className="mb-2 mr-sm-2"
              id="user_name"
              placeholder="User Name"
              name="username"
              value={this.state.user.username}
              onChange={this.updateUsername}
            />
            <Form.Label htmlFor="password" srOnly>
              Password
            </Form.Label>
            <Form.Group>
              <Form.Control
                className="mb-2 mr-sm-2"
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                // value={this.state.passwordText}
                onChange={this.updatePasswordText}
              />
            </Form.Group>

            <Button
              variant="primary"
              disabled={!(this.state.user.password && this.state.user.username)}
              onClick={this.handleAddUser}
              className="mb-2"
            >
              Add
            </Button>
          </Form>
          <UserTable
            headers={this.headers}
            tableData={Object.values(this.props.users)}
          ></UserTable>
        </Container>
      </>
    );
  }
}
