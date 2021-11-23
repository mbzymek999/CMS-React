import React, { useState, useEffect } from "react";
import axios from "axios";
import EventBus from "../../../src/common/EventBus";
import authHeader from "../../services/auth-header";
import {Button, Col, Container, Row} from "react-bootstrap";

export default function AllPaymentsController() {
    const [content, setContent] = useState([]);
    // let history = useHistory();

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

    return (
        <Container className={"mt-5"}>
            <Row className={"border"}>
                <Col>
                    <table className="table">
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