import React, {useEffect, useState} from "react";
import axios from "axios";
import authHeader from "../../../services/auth-header";
import {Alert, Col, Container, Row} from "react-bootstrap";
import EventBus from "../../../common/EventBus";
import {useParams} from "react-router-dom";
import globalUrl from "../../../state/globalUrl";

export default function UpdateEmployeeComponent() {
    const [employee, setEmployee] = useState([]);
    const { employeeId } = useParams();

    const handleSetInputs = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const [show, setShow] = useState(false);

    useEffect(() => {
        axios.get(`${globalUrl().url}/company/employee/`+ employeeId, { headers: authHeader() }).then(
            (response) => {
                setEmployee(response.data);
            },
            (error) => {
                const _employee =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setEmployee(_employee);

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }, [employeeId]);

    let updateEmployee = (event) => {
        event.preventDefault();
        axios.put(`${globalUrl().url}/company/employee/update/`+(employeeId), employee, { headers: authHeader() })
            .then((response) => {
                if (response.data != null) {
                    setShow(true);
                    setTimeout(() => setShow(false), 3000);
                    window.location.reload(false);
                } else {
                    setShow(false);
                }
            }).catch(err => {
            console.log(err)
        })
        setEmployee(employee);
    };

    return (
        <Container className={"mt-2"}>
            <Row>
                <Col>
                    <div className="card bg-light col-8">
                        <h3 className="text-center">Edycja pracownika <strong>{employee.name} {employee.lastName}</strong></h3>
                        {show ? <Alert message="Success! You added your item!" /> : null}
                        <form onSubmit={updateEmployee}>
                            <Row>
                                <Col>
                                    <label className="mb-1">Stanowisko</label>
                                    <input
                                        role="position"
                                        type="text"
                                        name="position"
                                        value={employee.position}
                                        onChange={handleSetInputs}
                                        className="form-control"
                                    />
                                </Col>
                                <Col>
                                    <label className="mb-1">Numer telefonu</label>
                                    <input
                                        role="phone"
                                        type="text"
                                        name="phone"
                                        value={employee.phone}
                                        onChange={handleSetInputs}
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label className="mb-1">Ulica</label>
                                    <input
                                        role="street"
                                        type="text"
                                        name="street"
                                        value={employee.street}
                                        onChange={handleSetInputs}
                                        className="form-control"
                                    />
                                </Col>
                                <Col>
                                    <label className="mb-1">Numer ulicy</label>
                                    <input
                                        role="streetNumber"
                                        type="text"
                                        name="streetNumber"
                                        value={employee.streetNumber}
                                        onChange={handleSetInputs}
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label className="mb-1">Numer domu</label>
                                    <input
                                        role="buildingNumber"
                                        type="text"
                                        name="buildingNumber"
                                        value={employee.buildingNumber}
                                        onChange={handleSetInputs}
                                        className="form-control"
                                    />
                                </Col>
                                <Col>
                                    <label className="mb-1">Kod pocztowy</label>
                                    <input
                                        role="postcode"
                                        type="text"
                                        name="postcode"
                                        value={employee.postcode}
                                        onChange={handleSetInputs}
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label className="mb-1">Miasto</label>
                                    <input
                                        role="city"
                                        type="text"
                                        name="city"
                                        value={employee.city}
                                        onChange={handleSetInputs}
                                        className="form-control"
                                    />
                                </Col>
                                <Col></Col>
                            </Row>
                            <br/>
                            <div className="d-flex justify-content-end">
                                <button
                                    style={{marginRight: "5px"}}
                                    type="submit"
                                    onSubmit={updateEmployee}
                                    className="btn btn-primary"
                                >
                                    Zapisz
                                </button>
                                {' '}
                            </div>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}