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
      <div style={{
            backgroundColor: "#b8c6db",
            backgroundImage: "linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)"
        }}>
            <Container>
                <Row>
                    <Col sm="8" className="mt-3">
                        <div className="mt-5">
                            <h2 style={{textAlign: "center"}} className="mt-3"><strong>CmsSoftware - system do sprawnego zarządzania firmą.</strong></h2>
                            <p style={{textAlign: "center"}} className="mb-1 mt-5">Zarządzaj pracownikami w łatwy i przyjemny sposób.</p>
                            <p style={{textAlign: "center"}} className="mt-1 mb-1">CmsSoftware to narzędzie przeznaczone dla firm, które służy do planowania,</p>
                            <p style={{textAlign: "center"}} className="mt-0">śledzenia aktywnych zadań oraz zarządzania pracownikami.</p>
                        </div>
                    </Col>
                    <Col sm="4" className="mb-3 mt-3">
                        <div>
                            <img src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1039&q=80" className="img-fluid mx-auto d-block" alt="header"/>
                        </div>
                    </Col>
                    <Col className="mt-5 mb-5" sm={"12"}>
                        <div>
                            <h4 style={{textAlign: "center"}}><strong>Wszystkie przypisane zadania w jednym miejscu</strong></h4>
                            <h4 style={{textAlign: "center"}}>Monitoruj postępy pracowników, dzięki <strong>CmsSoftware</strong> żadne zadanie nie zostanie pominięte!</h4>
                        </div>
                        <div className="mt-5">
                            <img src={process.env.PUBLIC_URL + '/tasks.PNG'} className="img-fluid mx-auto d-block"/>
                        </div>
                    </Col>
                    {/*<Col className="mt-5">*/}
                    {/*    <h3>Dopasuj system do swoich potrzeb</h3>*/}
                    {/*    <h3>Do 5 pracowników za</h3>*/}
                    {/*</Col>*/}
                </Row>
            </Container>
        </div>

    );
  }
}
