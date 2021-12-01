import React, { useState, useEffect } from "react";
import axios from "axios";
import EventBus from "../../../src/common/EventBus";
import authHeader from "../../services/auth-header";
import {Button, Col, Container, Row, Table} from "react-bootstrap";

export default function CompanyPaymentsController() {
    const [content, setContent] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/company/payments", { headers: authHeader() }).then(
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

    return (

        <Container className={"mt-5 "}>
            <Row>
                <Col>
                    <Table striped bordered hover className={"bg-light"}>
                        <thead>
                        <tr>
                            <th scope="col">Płatność opłacona</th>
                            <th scope="col">Termin płatności</th>
                            <th scope="col">Data wystawienia</th>
                            <th scope="col">Cena</th>
                        </tr>
                        </thead>
                        <tbody>
                        {content.map((item) =>
                            <>{item.paymentDone ?
                                <tr className="bg-success">
                                    <td>{item.paymentDone ? "Tak" : "Nie"}</td>
                                    <td>{item.datePayment}</td>
                                    <td>{item.termPayment}</td>
                                    <td>{item.price} zł</td>
                                    <td>
                                        <form
                                            method="post"
                                            action={`http://localhost:8080/checkout?idPayment=${item.paymentId}`}
                                        >
                                            <Button className="btn btn-primary" size="sm" type="submit">Zapłać</Button>
                                        </form>
                                    </td>
                                </tr> :
                                <tr className="bg-danger">
                                    <td>{item.paymentDone ? "Tak" : "Nie"}</td>
                                    <td>{item.termPayment}</td>
                                    <td>{item.datePayment}</td>
                                    <td>{item.price} zł</td>
                                    <td>
                                        <form
                                            method="post"
                                            action={`http://localhost:8080/checkout?idPayment=${item.paymentId}`}
                                        >
                                            <Button className="btn btn-primary" size="sm" type="submit">Zapłać</Button>
                                        </form>
                                    </td>
                                </tr>}
                            </>
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}