import React, {useState} from "react";
import {Badge, Button, Card, Col, Container, Row} from "react-bootstrap";
import FormRange from "react-bootstrap/FormRange";
import {faPhoneAlt} from "@fortawesome/free-solid-svg-icons";
import {faMailBulk} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import globalUrl from "../state/globalUrl";

export default function HomeComponent() {

    const [numberEmployees, setNumberEmployee] = useState(5);
    const [isLoading, setLoading] = useState(false);
    const [isSuccessful, setSuccessful] = useState(0);

    const priceFunction = () => {
        if (numberEmployees > 0 && numberEmployees <= 5) {
            return (numberEmployees * 5.5).toFixed(2);
        } else if (numberEmployees <= 10) {
            return (numberEmployees * 5.2).toFixed(2);
        } else if (numberEmployees <= 20) {
            return (numberEmployees * 5.0).toFixed(2);
        } else if (numberEmployees <= 50) {
            return (numberEmployees * 4.8).toFixed(2);
        } else {
            return (numberEmployees * 4.5).toFixed(2);
        }
    }

    const handleSetInputs = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const initialValues = {
        companyName: "",
        email: "",
        phone: "",
        message: ""
    };

    const [values, setValues] = useState({
        companyName: "",
        email: "",
        phone: "",
        message: ""
    });

    let sendMessage = (event) => {
        let dataContainer1 = document.getElementById('data-container1');
        let dataContainer2 = document.getElementById('data-container2');
        setLoading(true);
        event.preventDefault();
        axios.post(`${globalUrl().url}/message/send`, values)
            .then((response) => {
                if (response.data != null) {
                    setLoading(false);
                    dataContainer1.setAttribute('data-value', response.data);
                    dataContainer1.innerHTML = response.data;
                    setSuccessful(1);
                } else {
                    dataContainer1.setAttribute('data-value', response.data);
                    dataContainer1.innerHTML = response.data;
                    setLoading(false);
                    setSuccessful(2);
                }
            }).catch(err => {
            console.log(err)
            dataContainer2.setAttribute('data-value', err.data);
            dataContainer2.innerHTML = err.data;
            setLoading(false);
            setSuccessful(2);
        })
        setValues(initialValues);
    };

    return (
        <div style={{
            backgroundColor: "#b8c6db",
            backgroundImage: "linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)"
        }}>
            <Container
                role="home"
            >
                <Row>
                    <Col>
                        <Card style={{backgroundColor: "rgba(228,230,243,0.32)"}}>
                            <Row>
                                <Col sm="8" className="mt-1">
                                    <div className="mt-5">
                                        <h2 style={{textAlign: "center"}} className="mt-3"><strong>CmsSoftware - system do sprawnego zarządzania firmą.</strong></h2>
                                        <p style={{textAlign: "center"}} className="mb-1 mt-5">Zarządzaj pracownikami w łatwy i przyjemny sposób.</p>
                                        <p style={{textAlign: "center"}} className="mt-1 mb-1">CmsSoftware to narzędzie przeznaczone dla firm, które służy do planowania,</p>
                                        <p style={{textAlign: "center"}} className="mt-0">śledzenia aktywnych zadań oraz zarządzania pracownikami.</p>
                                    </div>
                                </Col>
                                <Col sm="4" className="mb-3 mt-3">
                                    <div>
                                        <img src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1039&q=80" className="img-fluid mx-auto d-block rounded shadow p-1 mb-1" alt="header"/>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col className="mt-5 mb-0" sm={"12"}>
                        <div>
                            <h4 style={{textAlign: "center"}}><strong>Wszystkie przypisane zadania w jednym miejscu</strong></h4>
                            <h4 style={{textAlign: "center"}}>Monitoruj postępy pracowników, dzięki <strong>CmsSoftware</strong> żadne zadanie nie zostanie pominięte!</h4>
                        </div>
                        <div className="mt-5">
                            <img src="https://drive.google.com/uc?export=view&id=1elARbGMg9m07EdMrtJoE3diYL8YwO4Iy" className="img-fluid mx-auto d-block rounded shadow p-2 mb-5" alt="Widok zadań"/>
                        </div>
                    </Col>
                    <Col>
                        <Card style={{backgroundColor: "rgba(244,244,248,0.8)"}} className="mb-5">
                            <h3 style={{textAlign: "center"}}>Dopasuj system do swoich potrzeb</h3>
                            <h3 style={{textAlign: "center"}}>Cena za <strong>{numberEmployees}</strong> pracowników to <strong>{priceFunction()}</strong>zł miesięcznie.</h3>
                            <Row className="justify-content-center">
                                <Col className="mt-2 bg-light col-8">
                                    <label className="mb-1"><h5><Badge>Wybierz ilość pracowników</Badge></h5></label>
                                    <FormRange
                                        min={3}
                                        max={100}
                                        className="mb-2 mt-0"
                                        value={numberEmployees}
                                        onChange={e => setNumberEmployee(e.target.value)}
                                        size='lg'
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card style={{backgroundColor: "rgba(244,244,248,0.8)"}} className="mb-5">
                            <Row>
                                <Col className="col-6 h-50">
                                    <Container>
                                        <img src="https://drive.google.com/uc?export=view&id=17vEJyXNaK4_FkLqr1X8E_FOyvUnwnntY" className="img-fluid" alt="contact"/>
                                        <Row className="mt-4">
                                            <Col sm={"5"}>
                                                <p style={{fontSize: "20px"}}>
                                                    <FontAwesomeIcon icon={faPhoneAlt} style={{fontSize: "20px"}} className="text-black"></FontAwesomeIcon> Telefon:
                                                    <p><span style={{color: "#037743"}}><strong> 791-792-938</strong></span></p>
                                                </p>
                                            </Col>
                                            <Col>

                                                <p style={{fontSize: "20px"}}>
                                                    <FontAwesomeIcon icon={faMailBulk} style={{fontSize: "20px"}} className="text-black"></FontAwesomeIcon> E-mail:
                                                    <span style={{color: "#037743"}}><strong> cmssystemcom@gmail.com</strong></span>
                                                </p>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                                <Col>
                                    <h3 style={{textAlign: "center"}} className="mt-5"><strong>Wyślij nam wiadomość!</strong></h3>
                                    <form onSubmit={sendMessage}>
                                        <Row>
                                            <Col sm="10">
                                                <label>Wprowadź nazwę firmy</label>
                                                <input
                                                    type="text"
                                                    name="companyName"
                                                    value={values.companyName}
                                                    onChange={handleSetInputs}
                                                    className="form-control"
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col sm="10">
                                                <label>Wprowadź e-mail</label>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleSetInputs}
                                                    className="form-control"
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col sm="10">
                                                <label>Wprowadź numer telefonu</label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    value={values.phone}
                                                    onChange={handleSetInputs}
                                                    className="form-control"
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col sm="10">
                                                <label>Wiadomość</label>
                                                <textarea
                                                    type="text"
                                                    name="message"
                                                    value={values.message}
                                                    onChange={handleSetInputs}
                                                    className="form-control"
                                                />
                                            </Col>
                                        </Row>

                                        <br/>
                                        <div className="d-flex">
                                            { !isLoading &&
                                                <Button
                                                    className="btn btn-success"
                                                    type="submit"
                                                    onSubmit={sendMessage}
                                                >Wyślij wiadomość</Button>
                                            }
                                            { isLoading &&
                                                <button
                                                    className="btn btn-success"
                                                    disabled
                                                    type="submit"
                                                >
                                                <span className="spinner-border spinner-border-sm" role="status"
                                                      aria-hidden="true"/>
                                                    Wyślij wiadomość...
                                                </button>
                                            }
                                        </div>
                                    </form>
                                    <div id="data-container1" className={ isSuccessful === 1 && "alert alert-success"} data-value="">
                                    </div>
                                    <div id="data-container2" className={ isSuccessful === 2 && "alert alert-danger"} data-value="">
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
