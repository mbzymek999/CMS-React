import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { connect } from "react-redux";
import { register } from "../../../actions/auth";
import {Badge, Col, Container, Row} from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Pole jest wymagane!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const provinces = ['dolnośląskie', 'kujawsko-pomorskie', 'lubelskie', 'lubuskie', 'łódzkie', 'małopolskie', 'mazowieckie', 'opolskie', 'podkarpackie',
                  'podlaskie', 'pomorskie', 'śląskie', 'świętokrzyskie', 'warmińsko-mazurskie', 'wielkopolskie', 'zachodniopomorskie'];


class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeCompanyName = this.onChangeCompanyName.bind(this)
    this.onChangeShortCompanyName = this.onChangeShortCompanyName.bind(this)
    this.onChangeNip = this.onChangeNip.bind(this)
    this.onChangeRegon = this.onChangeRegon.bind(this)
    this.onChangeRepresentativePerson = this.onChangeRepresentativePerson.bind(this)
    this.onChangePhone = this.onChangePhone.bind(this)
    this.onChangeStreet = this.onChangeStreet.bind(this)
    this.onChangeStreetNumber = this.onChangeStreetNumber.bind(this)
    this.onChangeBuildingNumber = this.onChangeBuildingNumber.bind(this)
    this.onChangeCity = this.onChangeCity.bind(this)
    this.onChangePostcode = this.onChangePostcode.bind(this)
    this.handleProvinceChange = this.handleProvinceChange.bind(this)
    this.onChangeCountry = this.onChangeCountry.bind(this)
    this.onChangeAdditionalFields = this.onChangeAdditionalFields.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      companyName: '',
      shortCompanyName: '',
      nip: '',
      regon: '',
      phone: '',
      representativePerson: '',
      street: '',
      streetNumber: '',
      buildingNumber: '',
      city: '',
      postcode: '',
      province: '',
      country: '',
      additionalFields: '',
      maxEmployees: 1,
      password: '',
      successful: false,
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeCompanyName(e) {
    this.setState({
      companyName: e.target.value,
    });
  }

  onChangeShortCompanyName(e) {
    this.setState({
      shortCompanyName: e.target.value,
    });
  }

  onChangeNip(e) {
    this.setState({
      nip: e.target.value,
    });
  }

  onChangeRegon(e) {
    this.setState({
      regon: e.target.value,
    });
  }

  onChangeRepresentativePerson(e) {
    this.setState({
      representativePerson: e.target.value,
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value,
    });
  }

  onChangeStreet(e) {
    this.setState({
      street: e.target.value,
    });
  }

  onChangeStreetNumber(e) {
    this.setState({
      streetNumber: e.target.value,
    });
  }

  onChangeBuildingNumber(e) {
    this.setState({
      buildingNumber: e.target.value,
    });
  }

  onChangeCity(e) {
    this.setState({
      city: e.target.value,
    });
  }

  onChangePostcode(e) {
    this.setState({
      postcode: e.target.value,
    });
  }

  handleProvinceChange = (e) => {
    this.setState({
      province: e.target.value,
    });
  };

  onChangeCountry(e) {
    this.setState({
      country: e.target.value,
    });
  }

  onChangeAdditionalFields(e) {
    this.setState({
      additionalFields: e.target.value,
    });
  }

  onChangeMaxEmployees(e) {
    this.setState({
      maxEmployees: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          register(this.state.username, this.state.companyName, this.state.shortCompanyName, this.state.nip, this.state.regon, this.state.representativePerson, this.state.phone, this.state.street, this.state.streetNumber,
              this.state.buildingNumber, this.state.city, this.state.postcode, this.state.province, this.state.country, this.state.additionalFields, this.state.maxEmployees, this.state.email, this.state.password)
        )
        .then(() => {
          this.setState({
            successful: true,
          });
        })
        .catch(() => {
          this.setState({
            successful: false,
          });
        });
    }
  }

  render() {
    const { message } = this.props;

    return (
        <div className="card bg-light col-8">
          <h3 className="text-center bg-primary"><Badge>Tworzenie nowej firmy</Badge></h3>
          <Form
              onSubmit={this.handleRegister}
              ref={(c) => {
                this.form = c;
              }}
          >
            {!this.state.successful && (
                <Tabs defaultActiveKey="first" className="mb-3">
                  <Tab eventKey="first" title="Dane firmy">
                    <div>
                      <Container>
                        <Row>
                          <Col>
                            <div className="form-group">
                              <label htmlFor="companyName">Nazwa firmy</label>
                              <Input
                                  type="text"
                                  className="form-control"
                                  name="companyName"
                                  value={this.state.companyName}
                                  onChange={this.onChangeCompanyName}
                              />
                            </div>
                          </Col>
                          <Col>
                            <div className="form-group">
                              <label htmlFor="shortCompanyName">Skrócona nazwa firmy</label>
                              <Input
                                  type="text"
                                  className="form-control"
                                  name="shortCompanyName"
                                  value={this.state.shortCompanyName}
                                  onChange={this.onChangeShortCompanyName}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="form-group">
                              <label htmlFor="nip">Nip</label>
                              <Input
                                  type="text"
                                  className="form-control"
                                  name="nip"
                                  value={this.state.nip}
                                  onChange={this.onChangeNip}
                              />
                            </div>
                          </Col>
                          <Col>
                            <div className="form-group">
                              <label htmlFor="nip">Regon</label>
                              <Input
                                  type="text"
                                  className="form-control"
                                  name="regon"
                                  value={this.state.regon}
                                  onChange={this.onChangeRegon}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="form-group">
                              <label htmlFor="representativePerson">Osoba reprezentująca</label>
                              <Input
                                  className="form-control"
                                  name="representativePerson"
                                  value={this.state.representativePerson}
                                  onChange={this.onChangeRepresentativePerson}
                              />
                            </div>
                          </Col>
                          <Col>
                            <div className="form-group">
                              <label htmlFor="nip">Telefon firmowy</label>
                              <Input
                                  type="text"
                                  className="form-control"
                                  name="phone"
                                  value={this.state.phone}
                                  onChange={this.onChangePhone}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="form-group">
                              <label htmlFor="additionalFields">Maksymalna ilość pracowników</label>
                              <Input
                                  type="number"
                                  className="form-control"
                                  name="maxEmployees"
                                  value={this.state.maxEmployees}
                                  onChange={this.onChangeMaxEmployees.bind(this)}
                              />
                            </div>
                          </Col>
                          <Col>
                            <div className="form-group">
                              <label htmlFor="additionalFields">Informacje dodatkowe</label>
                              <Input
                                  className="form-control"
                                  name="additionalFields"
                                  value={this.state.additionalFields}
                                  onChange={this.onChangeAdditionalFields}
                              />
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  </Tab>
                  <Tab eventKey="second" title="Siedziba firmy">
                    <Container>
                      <Row>
                        <Col>
                          <div className="form-group">
                            <label htmlFor="street">Ulica</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="street"
                                value={this.state.street}
                                onChange={this.onChangeStreet}
                            />
                          </div>
                        </Col>
                        <Col>
                          <div className="form-group">
                            <label htmlFor="streetNumber">Numer ulicy</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="streetNumber"
                                value={this.state.streetNumber}
                                onChange={this.onChangeStreetNumber}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="col-6">
                          <div className="form-group">
                            <label htmlFor="buildingNumber">Numer lokalu</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="buildingNumber"
                                value={this.state.buildingNumber}
                                onChange={this.onChangeBuildingNumber}
                            />
                          </div>
                        </Col>
                        <Col>
                          <div className="form-group">
                            <label htmlFor="city">Miasto</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="city"
                                value={this.state.city}
                                onChange={this.onChangeCity}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className="form-group">
                            <label htmlFor="postcode">Kod pocztowy</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="postcode"
                                value={this.state.postcode}
                                onChange={this.onChangePostcode}
                            />
                          </div>
                        </Col>
                        <Col>
                          <div className="form-group">
                            <label htmlFor="province">Województwo</label>
                            <select onChange={this.handleProvinceChange} value={this.state.province} className="mb-2 form-select" aria-label="Default select example">
                              {provinces.map((province) => (
                                  <option key={province} value={province}>
                                    {province}
                                  </option>
                              ))}
                            </select>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className="form-group">
                            <label htmlFor="country">Kraj</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="country"
                                value={this.state.country}
                                onChange={this.onChangeCountry}
                            />
                          </div>
                        </Col>
                        <Col></Col>
                      </Row>
                    </Container>
                  </Tab>
                  <Tab className="mb-3" eventKey="third" title="Dane logowania">
                    <Container>
                      <Row>
                        <Col>
                          <div className="form-group">
                            <label htmlFor="username">Nazwa użytkownika</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="username"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                                validations={[required, vusername]}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                validations={[required, email]}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="password">Hasło</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={[required, vpassword]}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className="form-group mt-3">
                            <button className="btn btn-primary btn-block">Zarejestruj firme</button>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </Tab>
                </Tabs>
            )}

            {this.state.successful && (
                <div className="form-group">
                  <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                    <p style={{textAlign: "center"}}>Firma zarejestowana pomyślne!</p>
                  </div>
                </div>
            )}

            {message && (
                <div className="form-group">
                  <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
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
        </div>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(Register);
