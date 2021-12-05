import React, {useState} from "react";
import axios from "axios";
import authHeader from "../../../services/auth-header";
import {Alert, Col, Container, Row} from "react-bootstrap";
import DatePicker from "react-datepicker";
import AsyncSelect from "react-select/async";

export default function CreateTaskController() {
    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);

    // handle input change event
    const handleInputChange = value => {
        setValue(value);
    };

    // handle selection
    const handleChange = value => {
        setSelectedValue(value);
    }

    const fetchEmployees = () => {
        return axios.get('http://localhost:8080/company/employees', { headers: authHeader() }).then(result => {
            const res =  result.data;
            return res;
        });
    }

    const handleSetInputs = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onChangeDateTo = date => {
        setValues({ ...values, dateTo: date });
    }

    const initialValues = {
        name: "",
        description: "",
        type: "",
        dateTo: new Date(),
    };

    const [values, setValues] = useState({
        name: "",
        description: "",
        type: "",
        dateTo: new Date()
    });
    const [show, setShow] = useState(false);

    let submitTask = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/task/add?employeeId="+(selectedValue.employeeId), values, { headers: authHeader() })
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
                            <Row className={"mt-2"}>
                                <Col>
                                    {/*<div className="row alert alert-info">Selected Value: {JSON.stringify(selectedValue || {}, null, 2)}</div>*/}
                                    <label className="mb-1">Wybierz pracownika z listy</label>
                                    <AsyncSelect
                                        cacheOptions
                                        defaultOptions
                                        placeholder={""}
                                        value={selectedValue}
                                        getOptionLabel={e => e.name + ' ' + e.lastName}
                                        getOptionValue={e => e.employeeId}
                                        loadOptions={fetchEmployees}
                                        onInputChange={handleInputChange}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col></Col>
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