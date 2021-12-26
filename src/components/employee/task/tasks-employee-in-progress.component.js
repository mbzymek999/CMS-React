import React, { useState, useEffect } from "react";
import axios from "axios";
import EventBus from "../../../common/EventBus";
import authHeader from "../../../services/auth-header";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {Tooltip, OverlayTrigger} from "react-bootstrap";
import globalUrl from "../../../state/globalUrl";

export default function TasksEmployeeInProgress() {
    const [showTasks, setShowTasks] = useState([]);
    const [taskUpdate, setTasksUpdate] = useState([]);

    useEffect(() => {
        axios.get(`${globalUrl().url}/employee/tasks/1`, { headers: authHeader() }).then(
            (response) => {
                setShowTasks(response.data.tasks);
            },
            (error) => {
                // history.replace("/")
                const _task =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setShowTasks(_task);

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }, []);

    function updateTask(idTask) {
        axios.put(`${globalUrl().url}/employee/task/update/`+ (idTask), {
            statusTask: 2
        },{ headers: authHeader() })
            .then((response) => {
                if (response.data != null) {
                    setTasksUpdate(true);
                    setTimeout(() => setTasksUpdate(false), 3000);
                    window.location.reload(false);
                } else {
                    setTasksUpdate(false);
                }
            })
    }

    if (!taskUpdate) return "No taskUpdate!"

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Naciśnij jeżeli zadanie zostało wykonane
        </Tooltip>
    );

    return (
        <Container>
            <Row>
                {showTasks.map((item) =>
                    <Col className="col-4">
                        <Card border="warning" style={{ height: '14rem' }} className="mt-4">
                            <Card.Header>{item.name} <span className="float-end">Data: <strong>{item.createdDate}</strong></span></Card.Header>
                            <Card.Body>
                                <Card.Text  style={{height: '5rem' }}>
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
                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip}
                                >
                                    <Button className="btn btn-primary" size="sm" onClick={() => updateTask(item.idTask)}>Wykonano</Button>
                                </OverlayTrigger>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
        </Container>
    );
}