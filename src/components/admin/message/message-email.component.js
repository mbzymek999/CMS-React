import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import authHeader from "../../../services/auth-header";
import EventBus from "../../../common/EventBus";
import {Button, Col, Container, Row} from "react-bootstrap";
import globalUrl from "../../../state/globalUrl";

const MessageEmailComponent = () => {
    const { idClient } = useParams();
    const [message, setMessage] = useState([]);

    useEffect(() => {
        axios.get(`${globalUrl().url}/message/read/`+ idClient, { headers: authHeader() }).then(
            (response) => {
                setMessage(response.data);
            },
            (error) => {
                const _message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(_message);

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }, [idClient]);

    const handleSetInputs = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const initialValues = {
        answer: ""
    };

    const [values, setValues] = useState({
        answer: ""
    });

    let sendEmail = (event) => {
        event.preventDefault();
        axios.post(`${globalUrl().url}/message/email?clientEmail=${message.emailMessage}`, values, { headers: authHeader() })
            .then((response) => {
                if (response.data != null) {
                } else {
                }
            }).catch(err => {
            console.log(err)
        })
        setValues(initialValues);
    };

    return (
        <Container className={"mt-5"}>
            <Row>
                <Col sm={2}></Col>
                <Col className="bg-light border">
                    <h6 className="mt-3" style={{textAlign:"center"}}>
                        <strong>Wiadomość</strong>
                    </h6>
                    <p>idClient <strong>{message.idClient}</strong> pomiędzy:</p>
                    <p>email klienta <strong>{message.emailMessage}</strong> pomiędzy:</p>
                    <form onSubmit={sendEmail}>
                        <Row className="mt-3">
                            <Col sm="10">
                                <label>Wiadomość</label>
                                <textarea
                                    type="text"
                                    name="answer"
                                    value={values.answer}
                                    onChange={handleSetInputs}
                                    className="form-control"
                                />
                            </Col>
                        </Row>

                        <br/>
                        <Button
                            className="btn btn-success"
                            type="submit"
                            onSubmit={sendEmail}
                        >Wyślij wiadomość</Button>
                    </form>
                </Col>
                <Col sm={2}></Col>
            </Row>
        </Container>
    )
}

export default MessageEmailComponent;