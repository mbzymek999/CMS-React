import React, { useState, useEffect } from "react";
import axios from "axios";
import EventBus from "../../../common/EventBus";
import authHeader from "../../../services/auth-header";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function EmployeesController() {
    const [employee, setEmployees] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/company/employees", { headers: authHeader() }).then(
            (response) => {
                setEmployees(response.data);
            },
            (error) => {
                // history.replace("/")
                const _employee =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setEmployees(_employee);

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
                            <th scope="col">Imię</th>
                            <th scope="col">Nazwisko</th>
                            <th scope="col">Stanowisko</th>
                            <th scope="col">Numer telefony</th>
                            <th scope="col">E-mail</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employee.map((item) =>
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.lastName}</td>
                                <td>{item.position}</td>
                                <td>{item.phone}</td>
                                <td>{item.email}</td>
                                <td style={{textAlign: "center"}}>
                                    <Link to={`/update_employee/${item.employeeId}`}>
                                        <Button className="btn btn-primary float-end" size="sm">
                                            Edytuj
                                        </Button>
                                    </Link>
                                </td>
                                <td style={{textAlign: "center"}}>
                                    <Button className="btn btn-danger" size="sm">Archiwizuj</Button>
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