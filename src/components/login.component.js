import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import {Badge, Card, Col, Row} from "react-bootstrap";

const required = (value) => {
  if (!value) {
    return (
        <div className="alert alert-danger" role="alert">
          Pole jest wymagane!
        </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.form.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(login(this.state.username, this.state.password))
          .then(() => {
            history.push("/home");
            window.location.reload();
          })
          .catch(() => {
            this.setState({
              loading: false
            });
          });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { isLoggedIn, message } = this.props;

    if (isLoggedIn) {
      return <Redirect to="/home" />;
    }

    return (

        <Row>
          <Col></Col>
          <Col className={"col-sm-6 center"}>
            <Card className="mb-5 bg-light">
              <Row>
                <Col>
                  <img src="https://drive.google.com/uc?export=view&id=17vEJyXNaK4_FkLqr1X8E_FOyvUnwnntY" className="img-fluid" alt="contact"/>
                </Col>
                <Col>
                  <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card mt-4" />
                  <h3 style={{textAlign: "center"}} className="mt-3"><Badge><strong>Panel logowania</strong></Badge></h3>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Form
                      onSubmit={this.handleLogin}
                      ref={(c) => {
                        this.form = c;
                      }}
                  >
                    <div className="form-group">
                      <label htmlFor="username">Nazwa użytkownika</label>
                      <Input
                          type="text"
                          className="form-control"
                          name="username"
                          value={this.state.username}
                          onChange={this.onChangeUsername}
                          validations={[required]}
                      />
                    </div>

                    <div className="form-group mb-2">
                      <label htmlFor="password">Hasło</label>
                      <Input
                          type="password"
                          className="form-control"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChangePassword}
                          validations={[required]}
                      />
                    </div>

                    <div className="form-group">
                      <button
                          className="btn btn-success btn-block"
                          disabled={this.state.loading}
                      >
                        {this.state.loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Zaloguj się</span>
                      </button>
                    </div>

                    {message && (
                        <div className="form-group">
                          <div className="alert alert-danger" role="alert">
                            {message}
                          </div>
                        </div>
                    )}
                    <CheckButton
                        style={{ display: "none" }}
                        ref={(c) => {
                          this.checkBtn = c;
                        }}
                    />
                  </Form>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col></Col>
        </Row>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(Login);
