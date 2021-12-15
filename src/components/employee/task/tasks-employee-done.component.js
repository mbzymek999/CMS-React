import React, { useState, useEffect } from "react";
import axios from "axios";
import EventBus from "../../../common/EventBus";
import authHeader from "../../../services/auth-header";
import {Card, Col, Container, Row} from "react-bootstrap";

export default function TasksEmployeeDone() {
    const [task, setTasks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/employee/tasks/2", { headers: authHeader() }).then(
            (response) => {
                setTasks(response.data);
            },
            (error) => {
                // history.replace("/")
                const _task =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setTasks(_task);

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }, []);

    return (
        <Container>
            <Row className="mt-0 p-0">
                {task.map((item) =>
                    <Col className="col-4">
                        <Card border="success" style={{ height: '14rem' }} className="mt-4">
                            <Card.Header>{item.name} <span className="float-end">Data: <strong>{item.createdDate}</strong></span></Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <Row className="mb-1">
                                        <Col>
                                            Zadanie: <strong>{item.type}</strong>
                                        </Col>
                                        <Col>
                                            Termin: <strong>{item.dateTo}</strong>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col>
                                            {item.description}
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
        </Container>
    );
}