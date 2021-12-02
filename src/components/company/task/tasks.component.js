import React, { useState, useEffect } from "react";
import axios from "axios";
import EventBus from "../../../common/EventBus";
import authHeader from "../../../services/auth-header";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function TasksController() {
    const [task, setTasks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/company/tasks", { headers: authHeader() }).then(
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
                    <Link to="/create_task">
                        <Button className="btn btn-primary float-end" size="sm">
                            Dodaj nowe zadanie
                        </Button>
                    </Link>
                    <Table striped bordered hover className={"bg-light"}>
                        <thead>
                        <tr>
                            <th scope="col">Nazwa</th>
                            <th scope="col">Typ zadania</th>
                            <th scope="col">Utworzono</th>
                            <th scope="col">Opis</th>
                            <th scope="col">Termin zadania</th>
                            <th scope="col">Pracownik</th>
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
                                <td>{item.employeeName}</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>

    );
}