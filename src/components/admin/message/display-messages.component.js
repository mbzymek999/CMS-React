import React, { useState, useEffect } from "react";
import axios from "axios";
import EventBus from "../../../common/EventBus";
import authHeader from "../../../services/auth-header";
import { Col, Container, Row, Table} from "react-bootstrap";
import globalUrl from "../../../state/globalUrl";

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
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th scope="col">nazwa firmy</th>
                            <th scope="col">e-mail</th>
                            <th scope="col">nr telefonu</th>
                            <th scope="col">Wiadomość</th>
                        </tr>
                        </thead>
                        <tbody>
                        {message.map((item) =>
                            <tr>
                                <td>{item.companyName}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.message}</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}