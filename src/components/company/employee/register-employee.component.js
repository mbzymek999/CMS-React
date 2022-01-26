import React, { Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import pl from "date-fns/locale/pl"; // the locale you want
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { isEmail } from "validator";
import { connect } from "react-redux";
import { registerEmployee } from "../../../actions/auth";
import {Badge, Col, Container, Row} from "react-bootstrap";
registerLocale("pl", pl); // register it with the name you want


const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Pole jest wymagane!
            </div>
        );
    }
};

const requiredMessage = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Sprawdź puste pola!
            </div>
        );
    }
};

const email = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                To nie jest poprawny e-mail
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                Nazwa użytkownika musi posiadać od 3 do 20 znaków.
            </div>
        );
    }
};

// const vpassword = (value) => {
//     if (value.length < 6 || value.length > 40) {
//         return (
//             <div className="alert alert-danger" role="alert">
//                 The password must be between 6 and 40 characters.
//             </div>
//         );
//     }
// };

class RegisterEmployee extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePesel = this.onChangePesel.bind(this);
        this.onChangePosition = this.onChangePosition.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this)
        this.onChangeStreet = this.onChangeStreet.bind(this)
        this.onChangeStreetNumber = this.onChangeStreetNumber.bind(this)
        this.onChangeBuildingNumber = this.onChangeBuildingNumber.bind(this)
        this.onChangeCity = this.onChangeCity.bind(this)
        this.onChangePostcode = this.onChangePostcode.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeBankAccount = this.onChangeBankAccount.bind(this);

        this.state = {
            username: "",
            name: "",
            lastName: "",
            pesel: 0,
            position: "",
            email: "",
            phone: "",
            street: "",
            streetNumber: "",
            buildingNumber: "",
            city: "",
            postcode: "",
            password: "",
            successful: false,
            isLoading: false,
            agreementType: "",
            assignedDate: new Date(),
            dateFrom: new Date(),
            dateTo: new Date(),
            salary: 0,
            bankAccount: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value,
        });
    }

    onChangePesel(e) {
        this.setState({
            pesel: e.target.value,
        });
    }

    onChangePosition(e) {
        this.setState({
            position: e.target.value,
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

    onChangeAssignedDate = date => {
        this.setState({
            assignedDate: date,
        });
    }

    onChangeAgreementType(e) {
        this.setState({
            agreementType: e.target.value,
        });
    }

    onChangeDateFrom = date => {
        this.setState({
            dateFrom: date,
        });
    }

    onChangeDateTo = date => {
        this.setState({
            dateTo: date,
        });
    }

    onChangeSalary(e) {
        this.setState({
            salary: e.target.value,
        });
    }

    onChangeBankAccount(e) {
        this.setState({
            bankAccount: e.target.value,
        });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            successful: false,
        });

        this.setState({
            isLoading: false,
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            this.setState({
                isLoading: true
            });
            this.props
                .dispatch(
                    registerEmployee(this.state.username, this.state.name, this.state.lastName, this.state.pesel, this.state.position, this.state.phone, this.state.street,
                        this.state.streetNumber, this.state.buildingNumber, this.state.city, this.state.postcode, this.state.email, this.state.assignedDate,
                        this.state.agreementType, this.state.dateFrom, this.state.dateTo, this.state.salary, this.state.bankAccount, this.state.password)
                )
                .then(() => {
                    this.setState({
                        successful: true,
                        isLoading: false
                    });
                })
                .catch(() => {
                    this.setState({
                        successful: false,
                        isLoading: false
                    });
                });
        }
    }

    render() {
        const { message } = this.props;
        return (
            <div>
                <div className="card bg-light col-8">
                    <h3 className="text-center bg-primary"><Badge>Tworzenie umowy dla pracownika</Badge></h3>
                    <Form
                        onSubmit={this.handleRegister}
                        ref={(c) => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                            <Tabs defaultActiveKey="first" className="mb-3">
                                <Tab className="mb-3" eventKey="first" title="Szczegóły umowy">
                                    <Container>
                                        <Row>
                                            <Col>
                                                <label className="mb-1">Data podpisania</label>
                                                <DatePicker
                                                    locale="pl"
                                                    selected={this.state.assignedDate}
                                                    onChange={this.onChangeAssignedDate.bind(this)}
                                                    dateFormat="dd-MM-yyyy"
                                                    className="border bg-white border-secondary rounded text-center w-100 p-1"
                                                    validations={[required]}
                                                />
                                            </Col>
                                            <Col>
                                                <label className="mb-1" htmlFor="name">Typ umowy</label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    name="agreementType"
                                                    value={this.state.agreementType}
                                                    onChange={this.onChangeAgreementType.bind(this)}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <label className="mb-1">Data rozpoczęcia</label>
                                                <DatePicker
                                                    locale="pl"
                                                    selected={this.state.dateFrom}
                                                    onChange={this.onChangeDateFrom.bind(this)}
                                                    dateFormat="dd-MM-yyyy"
                                                    className="border bg-white border-secondary rounded text-center w-100 p-1"
                                                    validations={[required]}
                                                />
                                            </Col>
                                            <Col>

                                                <label className="mb-1">Data zakończenia</label>
                                                <DatePicker
                                                    locale="pl"
                                                    selected={this.state.dateTo}
                                                    onChange={this.onChangeDateTo.bind(this)}
                                                    dateFormat="dd-MM-yyyy"
                                                    className="border bg-white border-secondary rounded text-center w-100 p-1"
                                                    validations={[required]}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="col-6">
                                                <label className="mb-1" htmlFor="name">Wynagrodzenie</label>
                                                <Input
                                                    type="number"
                                                    className="form-control"
                                                    name="salary"
                                                    value={this.state.salary}
                                                    onChange={this.onChangeSalary.bind(this)}
                                                />
                                            </Col>
                                            <Col className="col-6">
                                                <label className="mb-1" htmlFor="name">Konto bankowe</label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    name="bankAccount"
                                                    value={this.state.bankAccount}
                                                    onChange={this.onChangeBankAccount}
                                                />
                                            </Col>
                                        </Row>
                                    </Container>
                                </Tab>
                                <Tab eventKey="second" title="Dane pracownika">
                                    <div>
                                        <Container>
                                            <Row>
                                                <Col>
                                                    <div className="form-group">
                                                        <label htmlFor="name">Imię</label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            name="name"
                                                            value={this.state.name}
                                                            onChange={this.onChangeName}
                                                            validations={[required]}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className="form-group">
                                                        <label htmlFor="lastName">Nazwisko</label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            name="lastName"
                                                            value={this.state.lastName}
                                                            onChange={this.onChangeLastName}
                                                            validations={[required]}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <label className="" htmlFor="name">Pesel</label>
                                                    <Input
                                                        type="number"
                                                        className="form-control"
                                                        name="pesel"
                                                        value={this.state.pesel}
                                                        onChange={this.onChangePesel}
                                                        validations={[required]}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div className="form-group">
                                                        <label htmlFor="position">Stanowisko w firmie</label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            name="position"
                                                            value={this.state.position}
                                                            onChange={this.onChangePosition}
                                                        />
                                                    </div>
                                                </Col>
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
                                                        <label htmlFor="buildingNumber">Nr. mieszkania</label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            name="buildingNumber"
                                                            value={this.state.buildingNumber}
                                                            onChange={this.onChangeBuildingNumber}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div className="form-group">
                                                        <label htmlFor="streetNumber">Nr. budynku</label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            name="streetNumber"
                                                            value={this.state.streetNumber}
                                                            onChange={this.onChangeStreetNumber}
                                                            validations={[required]}
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
                                                            validations={[required]}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className="form-group">
                                                        <label htmlFor="nip">Telefon</label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            name="phone"
                                                            value={this.state.phone}
                                                            onChange={this.onChangePhone}
                                                            validations={[required]}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className={"col-4"}>
                                                    <div className="form-group">
                                                        <label htmlFor="postcode">Kod pocztowy</label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            name="postcode"
                                                            value={this.state.postcode}
                                                            onChange={this.onChangePostcode}
                                                            validations={[required]}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>
                                </Tab>
                                <Tab eventKey="third" title="Dane logowania">
                                    <Container>
                                        <Row>
                                            <Col>
                                                <div>
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

                                                    <div className="form-group mt-3 mb-4">
                                                        <Badge className={"bg-warning"}><h5><strong>Hasło</strong> zostanie wygenerowane automatycznie oraz wysłane na podany wyżej adres e-mail!</h5></Badge>
                                                    </div>

                                                    {/*<div className="form-group mt-2">*/}
                                                    {/*    <button className="btn btn-primary btn-block">Dodaj pracownika do systemu</button>*/}
                                                    {/*</div>*/}

                                                    <div className="d-flex"
                                                    >
                                                        { !this.state.isLoading &&
                                                            <button className="btn btn-primary btn-block"
                                                            >Dodaj pracownika do systemu</button>
                                                        }
                                                        { this.state.isLoading &&
                                                                <button
                                                                    className="btn btn-primary btn-block"
                                                                    disabled
                                                                >
                                                                    <span className="spinner-border spinner-border-sm" role="status"
                                                                          aria-hidden="true"/>
                                                                    Dodawanie pracownika do systemu...
                                                                </button>
                                                        }
                                                    </div>

                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Tab>
                            </Tabs>
                        )}

                        <Container className="mt-0">
                            <Row className="mt-0">
                                <Col>
                                    {this.state.successful && (
                                            <div className={ this.state.successful ? "alert alert-success mt-0" : "alert alert-danger mt-0" } role="alert">
                                                <p style={{textAlign: "center"}}>Pracownik został pomyślnie dodany do systemu!</p>
                                                <p style={{textAlign: "center"}}>Dane logowania zostały wysłane na podany adres e-mail.</p>
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
                                </Col>
                            </Row>
                        </Container>

                    </Form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { message } = state.message;
    return {
        message
    };
}

export default connect(mapStateToProps)(RegisterEmployee);
