import React, { useState, useEffect } from "react";
import axios from "axios";
import EventBus from "../../../common/EventBus";
import authHeader from "../../../services/auth-header";
import { Col, Container, Row, Table} from "react-bootstrap";

export default function DisplayCompaniesController() {
    const [company, setCompany] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/companies", { headers: authHeader() }).then(
            (response) => {
                setCompany(response.data);
            },
            (error) => {
                const _company =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setCompany(_company);

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
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">nazwa</th>
                                <th scope="col">numer telefonu</th>
                                <th scope="col">miasto</th>
                            </tr>
                        </thead>
                        <tbody>
                        {company.map((item) =>
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.companyName}</td>
                                <td>{item.phone}</td>
                                <td>{item.city}</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}