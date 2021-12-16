import React, { useState, useEffect } from "react";
import axios from "axios";
import EventBus from "../../../common/EventBus";
import authHeader from "../../../services/auth-header";
import { Col, Container, Row, Table} from "react-bootstrap";

export default function DisplayCompaniesController() {
    const [company, setCompany] = useState([]);

    const [nip, setNip] = useState("");
    const [companyName, setCompanyName] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8080/companies/read?nip=${nip}&companyName=${companyName}`, { headers: authHeader() }).then(
            (response) => {
                setCompany(response.data);
                console.log(nip)
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
    }, [nip, companyName]);

    const handleFilterNip = event => {
        setNip(event.target.value);
    };

    const handleFilterCompanyName = event => {
        setCompanyName(event.target.value);
    };

    return (
        <Container className={"mt-5 m-0 p-0"}>
            <Row className=" m-0 bg-light border-start border-top border-end">
                <Col className="mb-4 mt-4 ml-0">
                    <input
                        type="text"
                        name="nip"
                        placeholder="NIP"
                        value={nip}
                        onChange={handleFilterNip}
                        className="form-control"
                    />
                </Col>
                <Col className="mb-4 mt-4">
                    <input
                        type="text"
                        name="companyName"
                        placeholder="Nazwa firmy"
                        value={companyName}
                        onChange={handleFilterCompanyName}
                        className="form-control"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th scope="col">nazwa</th>
                                <th scope="col">nip</th>
                                <th scope="col">e-mail</th>
                                <th scope="col">numer telefonu</th>
                                <th scope="col">miasto</th>
                            </tr>
                        </thead>
                        <tbody>
                        {company.map((item) =>
                            <tr>
                                <td>{item.companyName}</td>
                                <td>{item.nip}</td>
                                <td>{item.email}</td>
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