import React, { useState, useEffect } from "react";
import axios from "axios";
import EventBus from "../../../common/EventBus";
import authHeader from "../../../services/auth-header";
import {Col, Container, Row, Table} from "react-bootstrap";
import globalUrl from "../../../state/globalUrl";
import {Link} from "react-router-dom";

export default function DisplayMessagesController() {
    const [message, setMessage] = useState([]);

    useEffect(() => {
        axios.get(`${globalUrl().url}/message/read`, { headers: authHeader() }).then(
            (response) => {
                setMessage(response.data);
            },
            (error) => {
                const _message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(_message);

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }, []);

    return (
        <Container className={"mt-5 m-0 p-0"}>
            <Row>
                <Col>
                    <Table striped bordered hover responsive
                            role="table"
                    >
                        <thead>
                        <tr>
                            <th>nazwa firmy</th>
                            <th>e-mail</th>
                            <th>nr telefonu</th>
                            <th>Wiadomość</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {message.map((item) =>
                            <tr>
                                <td>{item.companyName}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td style={{wordBreak: "break-all"}}>{item.message}</td>
                                <td>
                                    <Link to={`/message/read/${item.idClient}`}>
                                        Wiadomość
                                    </Link>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}