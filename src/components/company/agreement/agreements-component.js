import React, { useState, useEffect } from "react";
import axios from "axios";
import EventBus from "../../../common/EventBus";
import authHeader from "../../../services/auth-header";
import {Col, Container, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import globalUrl from "../../../state/globalUrl";

export default function AgreementsController() {
    const [agreement, setAgreements] = useState([]);

    useEffect(() => {
        axios.get(`${globalUrl().url}/company/agreements`, { headers: authHeader() }).then(
            (response) => {
                setAgreements(response.data);
            },
            (error) => {
                // history.replace("/")
                const _agreement =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setAgreements(_agreement);

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
                            <th scope="col">Data podpisania</th>
                            <th scope="col">Okres od</th>
                            <th scope="col">Okres do</th>
                            <th scope="col">Imię i nazwisko</th>
                            <th scope="col">Wynagrodzenie</th>
                            <th scope="col">Szczegóły umowy</th>
                        </tr>
                        </thead>
                        <tbody>
                        {agreement.map((item) =>
                            <tr key={item.idAgreement}>
                                <td>{item.assignedDate}</td>
                                <td>{item.dateFrom}</td>
                                <td>{item.dateTo}</td>
                                <td>{item.name} {item.lastName}</td>
                                <td>{item.salary}</td>
                                <td style={{textAlign: "center"}}>
                                <Link to={`/agreement/${item.idAgreement}`}>
                                    Szczegóły umowy
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