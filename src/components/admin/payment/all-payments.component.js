import React, { useState, useEffect } from "react";
import axios from "axios";
import EventBus from "../../../common/EventBus";
import authHeader from "../../../services/auth-header";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";

export default function AllPaymentsController() {
    const [content, setContent] = useState([]);
    const [company, setCompany] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios.get("http://localhost:8080/payments", { headers: authHeader() }).then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                // history.replace("/")
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8080/companies", { headers: authHeader() }).then(
            (response) => {
                setCompany(response.data);
            },
            (error) => {
                const _company =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setCompany(_company);

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }, []);

        const createPayment = (companyId) => {

            axios.post("http://localhost:8080/api/payment?companyId="+ (companyId), {}, { headers: authHeader() })
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
        };

    return (
        <Container className={"mt-5"}>
            <Row>
                <Col>
                    <Button className="btn btn-primary float-end" size="sm" onClick={handleShow}>
                        Dodaj nową płatność
                    </Button>

                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Wybierz firme z listy</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col>
                                    <table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th scope="col">id</th>
                                            <th scope="col">nazwa</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {company.map((item) =>
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>{item.companyName}</td>
                                                <td>
                                                    <Button className="btn btn-primary float-end" size="sm" onClick={() => createPayment(item.id)}>Dodaj płatność</Button>
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            {/*<Button onClick={createPayment(1)}>*/}
                            {/*    Zapisz*/}
                            {/*</Button>*/}
                            <Button variant="secondary" onClick={handleClose}>
                                zamknij
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
            <Row>
                <Col>
                    <table className="table border">
                        <thead>
                        <tr>
                            <th scope="col">Id płatności</th>
                            <th scope="col">Termin płatności</th>
                            <th scope="col">Data wystawienia</th>
                            <th scope="col">Cena</th>
                            <th scope="col">Płatność opłacona</th>
                            <th scope="col">Nazwa firmy</th>
                        </tr>
                        </thead>
                        <tbody>
                        {content.map((item) =>
                            <>{item.paymentDone ?
                                <tr className="bg-success">
                                    <td>{item.paymentId}</td>
                                    <td>{item.datePayment}</td>
                                    <td>{item.termPayment}</td>
                                    <td>{item.price} zł</td>
                                    <td>{item.paymentDone ? "Tak" : "Nie"}</td>
                                    <td>{item.companyName}</td>
                                </tr> :
                                <tr className="bg-danger">
                                    <td>{item.paymentId}</td>
                                    <td>{item.datePayment}</td>
                                    <td>{item.termPayment}</td>
                                    <td>{item.price} zł</td>
                                    <td>{item.paymentDone ? "Tak" : "Nie"}</td>
                                    <td>{item.companyName}</td>
                                </tr>}
                            </>
                        )}
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>

    );
}