import React, { Component } from "react";

import UserService from "../services/user.service";
import {Col, Container, Row} from "react-bootstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
        <Container>
          {/*<h3>{this.state.content}</h3>*/}
          <Row>
            <Col className="bg-info">
              <h1><strong>Company Management System</strong></h1>
              <h2>Start Panel</h2>
            </Col>
            <Col>
            </Col>
            <Col></Col>
          </Row>
        </Container>
    );
  }
}
