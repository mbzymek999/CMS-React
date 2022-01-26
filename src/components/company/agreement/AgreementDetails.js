import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import authHeader from "../../../services/auth-header";
import EventBus from "../../../common/EventBus";
import {Button, Col, Container, Row} from "react-bootstrap";
import globalUrl from "../../../state/globalUrl";

const AgreementDetails = () => {
    const { idAgreement } = useParams();
    const [agreement, setAgreements] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        axios.get(`${globalUrl().url}/company/agreement/`+ idAgreement, { headers: authHeader() }).then(
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
    }, [idAgreement]);

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
                    <p>reprezentowanym przez: <strong>{agreement.representativePerson}</strong></p>
                    <p>
                        a <strong>{agreement.name} {agreement.lastName}</strong>
                    </p>
                    <p>
                        zamieszkałym <strong> {show === false ? '********' : agreement.cityEmployee} </strong>
                        ul: <strong>
                        {show === false ? '****' : agreement.streetEmployee}
                        {show === false ? '****' : agreement.streetNumberEmployee}
                        {show === false ? '**** ' : agreement.buildingNumberEmployee ? '/' : ''} {show === false ? ' ************ ' : agreement.buildingNumberEmployee}
                    </strong>
                        PESEL: <strong>
                        {show === false ? '************ ' : agreement.pesel}
                        </strong>
                    </p>
                    <p>
                        na czas określony od <strong>{agreement.dateFrom}</strong> do <strong>{agreement.dateTo}</strong>. Wynagrodzenie:
                        <strong> {show === false ? ' ***** ' : agreement.salary}</strong> zł/msc
                    </p>
                    <form
                        method="get"
                        action={`${globalUrl().url}/pdf/generate/${idAgreement}`}
                    >
                        <Button className="btn btn-success mb-2" size="sm" type="submit">Generuj pdf</Button>


                        {   show === false ?
                            <Button className="btn btn-info mb-2 ms-2" size="sm" onClick={handleShow}>
                                Podaż ukryte dane
                            </Button> :
                            <Button className="btn btn-info mb-2 ms-2" size="sm" onClick={handleClose}>
                                Ukryj dane
                            </Button>
                        }
                    </form>
                </Col>
                <Col sm={2}></Col>
            </Row>
        </Container>
    )
}

export default AgreementDetails;