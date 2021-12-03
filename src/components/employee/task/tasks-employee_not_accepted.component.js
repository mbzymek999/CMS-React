import React, { useState, useEffect } from "react";
import axios from "axios";
import EventBus from "../../../common/EventBus";
import authHeader from "../../../services/auth-header";
import { Col, Container, Row, Table} from "react-bootstrap";

export default function TasksEmployeeNotAccepted() {
    const [task, setTasks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/employee/tasks/0", { headers: authHeader() }).then(
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
                        </tr>
                        </thead>
                        <tbody>
                        {task.map((item) =>
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.type}</td>
                                <td>{item.createdDate}</td>
                                <td>{item.description}</td>
                                <td>{item.dateTo}</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>

    );
}