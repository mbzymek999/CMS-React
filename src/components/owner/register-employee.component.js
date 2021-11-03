import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { connect } from "react-redux";
import { registerEmployee } from "../../actions/auth";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
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

class RegisterEmployee extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePosition = this.onChangePosition.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this)
        this.onChangeStreet = this.onChangeStreet.bind(this)
        this.onChangeStreetNumber = this.onChangeStreetNumber.bind(this)
        this.onChangeBuildingNumber = this.onChangeBuildingNumber.bind(this)
        this.onChangeCity = this.onChangeCity.bind(this)
        this.onChangePostcode = this.onChangePostcode.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            name: "",
            lastName: "",
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

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            successful: false,
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            this.props
                .dispatch(
                    registerEmployee(this.state.username, this.state.name, this.state.lastName, this.state.position, this.state.phone, this.state.street, this.state.streetNumber,
                        this.state.buildingNumber, this.state.city, this.state.postcode, this.state.email, this.state.password)
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
            <div className="col-md-12">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />

                    <Form
                        onSubmit={this.handleRegister}
                        ref={(c) => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
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
                                <hr/>
                                <h4>Dane pracownika</h4>

                                <div className="form-group">
                                    <label htmlFor="name">Imię</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChangeName}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lastName">Nazwisko</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        value={this.state.lastName}
                                        onChange={this.onChangeLastName}
                                    />
                                </div>

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

                                <div className="form-group">
                                    <label htmlFor="nip">Telefon</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        value={this.state.phone}
                                        onChange={this.onChangePhone}
                                    />
                                </div>
                                <hr/>
                                <h4 className="mt-2">Adres</h4>

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

                                <div className="form-group">
                                    <label htmlFor="streetNumber">nr Ulicy</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="streetNumber"
                                        value={this.state.streetNumber}
                                        onChange={this.onChangeStreetNumber}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="buildingNumber">nr mieszkania</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="buildingNumber"
                                        value={this.state.buildingNumber}
                                        onChange={this.onChangeBuildingNumber}
                                    />
                                </div>

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

                                <div className="form-group">
                                    <label htmlFor="province">Województwo</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="province"
                                        value={this.state.province}
                                        onChange={this.onChangeProvince}
                                    />
                                </div>

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

                                <div className="form-group mt-2">
                                    <button className="btn btn-primary btn-block">Dodaj pracownika do systemu</button>
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

export default connect(mapStateToProps)(RegisterEmployee);
