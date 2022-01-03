import React, { Component } from "react";

import UserService from "../services/user.service";
import {Col, Container, Image, Row} from "react-bootstrap";

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
              <Row className="bg-light border">
                  <Col>
                      <div className="mt-5">
                          <h3 style={{textAlign: "center"}} className="mt-3"><strong>CmsSoftware - system do sprawnego zarządzania firmą.</strong></h3>
                          <p style={{textAlign: "center"}} className="mb-1">Zarządzaj pracownikami w łatwy i przyjemny sposób.</p>
                          <p style={{textAlign: "center"}} className="mt-1 mb-1">CmsSoftware to narzędzie przeznaczone dla firm, które służy do planowania,</p>
                          <p style={{textAlign: "center"}} className="mt-0">śledzenia aktywnych zadań oraz zarządzaniem pracownikami.</p>
                      </div>
                  </Col>
                  <Col sm="4">
                      <div>
                          <img src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1039&q=80" className="img-fluid mx-auto d-block" alt="header"/>
                      </div>
                  </Col>
              </Row>
    );
  }
}
