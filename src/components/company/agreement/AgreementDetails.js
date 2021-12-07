import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import authHeader from "../../../services/auth-header";
import EventBus from "../../../common/EventBus";
import {Col, Container, Row} from "react-bootstrap";

const AgreementDetails = () => {
    const { idAgreement } = useParams();
    const [agreement, setAgreements] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/company/agreement/"+ idAgreement, { headers: authHeader() }).then(
            (response) => {
                setAgreements(response.data);
            },
            (error) => {
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
                <Col sm={2}></Col>
                <Col className="bg-light border">
                    <h6 className="mt-3" style={{textAlign:"center"}}>
                        <strong>UMOWA O PRACĘ NA CZAS OKREŚLONY</strong>
                    </h6>
                    <p>
                        zawarta dnia <strong>{agreement.assignedDate}</strong> pomiędzy:
                    </p>
                    <p>
                        <strong>{agreement.companyName}</strong> z siedzibą przy ul. <strong>{agreement.streetCompany} {agreement.streetNumberCompany}
                        {agreement.buildingNumberCompany ? '/' : ''}{agreement.buildingNumberCompany} </strong>
                       kod pocztowy <strong>{agreement.postcodeCompany} {agreement.cityCompany}</strong>
                    </p>
                    <p>
                        Nip: <strong>{agreement.nip}</strong>, regon: <strong>{agreement.regon}</strong>.
                    </p>
                    <p>reprezentowanym przez:</p>
                    <p>
                        a <strong>{agreement.name} {agreement.lastName}</strong>
                    </p>
                    <p>
                        zamieszkałym <strong>{agreement.cityEmployee} </strong>
                        ul: <strong>{agreement.streetEmployee} {agreement.streetNumberEmployee}{agreement.buildingNumberEmployee ? '/' : ''}{agreement.buildingNumberEmployee} </strong>
                        PESEL: {agreement.pesel}
                    </p>
                    <p>
                        na czas określony od <strong>{agreement.dateFrom}</strong> do <strong>{agreement.dateTo}</strong>. Wynagrodzenie <strong>{agreement.salary}</strong>zł/msc
                    </p>
                </Col>
                <Col sm={2}></Col>
            </Row>
        </Container>
    )
}

export default AgreementDetails;