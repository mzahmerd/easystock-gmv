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
  handleAddUser = () => {
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
