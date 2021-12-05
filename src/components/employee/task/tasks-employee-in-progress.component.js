import React, { useState, useEffect } from "react";
import axios from "axios";
import EventBus from "../../../common/EventBus";
import authHeader from "../../../services/auth-header";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {Tooltip, OverlayTrigger} from "react-bootstrap";

export default function TasksEmployeeInProgress() {
    const [showTask, setShowTasks] = useState([]);
    const [taskUpdate, setTasksUpdate] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/employee/tasks/1", { headers: authHeader() }).then(
            (response) => {
                setShowTasks(response.data);
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
        axios.put('http://localhost:8080/employee/task/update/'+ (idTask), {
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
            Naciśnij jeżeli wykonałeś zadanie
        </Tooltip>
    );

    return (
        <Container className={"mt-5"}>
            <Row>
                <Col>
                    <Table striped bordered hover className={"bg-light"}>
                        <thead>
                        <tr>
                            <th scope="col">Nazwa</th>
                            <th scope="col">Typ zadania</th>
                            <th scope="col">Utworzono</th>
                            <th scope="col">Opis</th>
                            <th scope="col">Termin zadania</th>
                            <th scope="col">Status zadania</th>
                        </tr>
                        </thead>
                        <tbody>
                        {showTask.map((item) =>
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.type}</td>
                                <td>{item.createdDate}</td>
                                <td>{item.description}</td>
                                <td>{item.dateTo}</td>
                                <td>{item.statusTask === 1? 'W trakcie': ''}</td>
                                <td>
                                    <OverlayTrigger
                                        placement="right"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltip}
                                    >
                                        <Button className="btn btn-primary" size="sm" onClick={() => updateTask(item.idTask)}>Wykonano</Button>
                                    </OverlayTrigger>
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