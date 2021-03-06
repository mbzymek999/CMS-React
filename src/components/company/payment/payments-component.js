import React, { useState, useEffect } from "react";
import axios from "axios";
import EventBus from "../../../common/EventBus";
import authHeader from "../../../services/auth-header";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import globalUrl from "../../../state/globalUrl";

export default function CompanyPaymentsController() {
    const [content, setContent] = useState([]);

    useEffect(() => {
        axios.get(`${globalUrl().url}/company/payments`, { headers: authHeader() }).then(
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
                    <Table
                        striped bordered hover className={"bg-light"}
                        role="table"
                    >
                        <thead>
                        <tr>
                            <th></th>
                            <th scope="col">Płatność opłacona</th>
                            <th scope="col">Termin płatności</th>
                            <th scope="col">Data wystawienia</th>
                            <th scope="col">Cena</th>
                        </tr>
                        </thead>
                        <tbody>
                        {content.map((item) =>
                            <>{item.paymentDone ?
                                <tr>
                                    <td style={{background: 'forestgreen'}}></td>
                                    <td>{item.paymentDone ? "Tak" : "Nie"}</td>
                                    <td>{item.datePayment}</td>
                                    <td>{item.termPayment}</td>
                                    <td>{item.price} zł</td>
                                    <td style={{textAlign: "center"}}>
                                        <form
                                            method="post"
                                            action={`${globalUrl().url}/checkout?idPayment=${item.paymentId}`}
                                        >
                                            <Button className="btn btn-primary" size="sm" type="submit">Zapłać</Button>
                                        </form>
                                    </td>
                                </tr> :
                                <tr>
                                    <td style={{background: 'crimson'}}></td>
                                    <td>{item.paymentDone ? "Tak" : "Nie"}</td>
                                    <td>{item.termPayment}</td>
                                    <td>{item.datePayment}</td>
                                    <td>{item.price} zł</td>
                                    <td style={{textAlign: "center"}}>
                                        <form
                                            method="post"
                                            action={`${globalUrl().url}/checkout?idPayment=${item.paymentId}`}
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