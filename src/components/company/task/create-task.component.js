import React, {useState} from "react";
import axios from "axios";
import authHeader from "../../../services/auth-header";
import {Button, Col, Container, Row} from "react-bootstrap";
import DatePicker from "react-datepicker";
import AsyncSelect from "react-select/async";
import globalUrl from "../../../state/globalUrl";

export default function CreateTaskController() {
    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);
    const [isSuccessful, setSuccessful] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const types = ['pilne', 'ważne', 'średni priorytet', 'niski priorytet'];

    // handle input change event
    const handleInputChange = value => {
        setValue(value);
    };

    // handle selection
    const handleChange = value => {
        setSelectedValue(value);
    }

    const fetchEmployees = () => {
        return axios.get(`${globalUrl().url}/company/employees`, { headers: authHeader() }).then(result => {
            const res =  result.data;
            return res;
        });
    }

    const handleSetInputs = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSetType = (e) => {
        setValues({ ...values, type: e.target.value });
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
        console.log(values)
        event.preventDefault();
        setLoading(true);
        if(selectedValue === null) {
            setLoading(false);
        }
        setSuccessful(0);
        let responseOk = document.getElementById('data-response-ok');
        let responseError = document.getElementById('data-response-error');
        axios.post(`${globalUrl().url}/task/add?employeeId=`+(selectedValue.employeeId), values, { headers: authHeader() })
            .then((response) => {
                if (response.data != null) {
                    setShow(true);
                    setLoading(false);
                    setSuccessful(1);
                    responseOk.setAttribute('data-value', response.data);
                    responseOk.innerHTML = response.data;
                    setTimeout(() => setShow(false), 3000);
                    // window.location.reload(false);
                } else {
                    setLoading(false);
                    setShow(false);
                    setSuccessful(1);
                    responseError.setAttribute('data-value', response.data);
                    responseError.innerHTML = response.data;

                }
            }).catch(err => {
            console.log(err)
            setLoading(false);
            setSuccessful(2);
            responseError.setAttribute('data-value', err.data);
            responseError.innerHTML = err.data;
        })
        setValues(initialValues);
    };

    return (
        <Container className={"mt-2"}>
            <Row>
                <Col>
                    <div className="card bg-light col-8">
                        <h3 className="text-center">Stwórz nowe zadanie</h3>
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
                                    <select
                                        onChange={handleSetType}
                                        value={values.type} className="mb-2 form-select" aria-label="Default select example">
                                        {types.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
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
                            {/*<div className={ selectedValue === null && "alert alert-danger"} data-value="">*/}
                            {/*</div>*/}

                            {isSuccessful === 0 && (
                                <div className={ selectedValue === null && "alert alert-danger mt-0 mb-0"} role="alert">
                                    Nie wybrano pracownika!
                                </div>
                            )}
                            <div id="data-response-ok" className={ isSuccessful === 1 && "alert alert-success mt-0 mb-0"} data-value="">
                            </div>
                            <div id="data-response-error" className={ isSuccessful === 2 && "alert alert-danger mt-0 mb-0"} data-value="">
                            </div>
                            <br/>
                            <div className="d-flex">
                                { !isLoading &&
                                    <Button
                                        className="btn btn-primary"
                                        type="submit"
                                        onSubmit={submitTask}
                                    >Zapisz</Button>
                                }
                                { isLoading &&
                                    <button
                                        className="btn btn-primary"
                                        disabled
                                        type="submit"
                                    >
                                                <span className="spinner-border spinner-border-sm" role="status"
                                                      aria-hidden="true"/>
                                        Zapisywanie...
                                    </button>
                                }
                            </div>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>

    );
}