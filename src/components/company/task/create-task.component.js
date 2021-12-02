import React, {useEffect, useState} from "react";
import axios from "axios";
import authHeader from "../../../services/auth-header";
import EventBus from "../../../common/EventBus";
import {Alert, Col, Container, Row} from "react-bootstrap";
import DatePicker from "react-datepicker";

export default function CreateTaskController() {
    const [content, setContent] = useState([]);
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/company/employees", { headers: authHeader() }).then(
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
    }, []);

    const initialValues = {
        name: "",
        description: "",
        type: "",
        dateTo: new Date(),
    };

    const [values, setValues] = useState({
        name: "",
        description: "",
        type: ""
    });
    const [show, setShow] = useState(false);

    const handleSetInputs = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onChangeDateTo = date => {
        setValues({ ...values, dateTo: date });
    }


    let submitTask = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/task/add?employeeId=1", values, { headers: authHeader() })
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
        setValues(initialValues);
    };

    return (
        <Container className={"mt-2"}>
            <Row>
                <Col>
                    <div className="card bg-light col-8">
                        <h3 className="text-center">Stwórz nowe zadanie</h3>
                        {show ? <Alert message="Success! You added your item!" /> : null}
                        <form onSubmit={submitTask}>
                            <div className="row">
                                <div className="col">
                                <label className="mb-1">Nazwa zadania</label>
                                    <input
                                            type="text"
                                            name="name"
                                            value={values.name}
                                            onChange={handleSetInputs}
                                            placeholder="name"
                                            className="form-control"
                                        />
                                </div>
                                <div className="col">
                                    <label className="mb-1">Opis</label>
                                        <input
                                            type="text"
                                            value={values.description}
                                            name="description"
                                            onChange={handleSetInputs}
                                            placeholder="description"
                                            className="form-control"
                                        />
                                </div>
                            </div>
                            <Row className={"mt-2"}>
                                <Col>
                                    <label className="mb-1">Typ zadania</label>
                                        <input
                                            type="text"
                                            value={values.type}
                                            name="type"
                                            onChange={handleSetInputs}
                                            placeholder="type"
                                            className="form-control"
                                        />
                                </Col>
                                <Col>
                                    <label className="mb-1">Czas trwania do</label>
                                    <DatePicker
                                        locale="pl"
                                        selected={values.dateTo}
                                        onChange={onChangeDateTo}
                                        dateFormat="dd-MM-yyyy"
                                        className="border bg-white border-secondary rounded text-center w-100 p-1"
                                    />
                                </Col>
                            </Row>
                            <br/>
                            <div className="d-flex justify-content-end">
                                <button
                                    style={{marginRight: "5px"}}
                                    type="submit"
                                    onSubmit={submitTask}
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