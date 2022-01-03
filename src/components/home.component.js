import React, {useState} from "react";
import {Badge, Card, Col, Container, Row} from "react-bootstrap";
import FormRange from "react-bootstrap/FormRange";

export default function HomeComponent() {

    const [numberEmployees, setNumberEmployee] = useState(5);

    const priceFunction = () => {
        if (numberEmployees > 0 && numberEmployees <= 5) {
            return (numberEmployees * 5.5).toFixed(2);
        } else if (numberEmployees <= 10) {
            return (numberEmployees * 5.2).toFixed(2);
        } else if (numberEmployees <= 20) {
            return (numberEmployees * 5.0).toFixed(2);
        } else if (numberEmployees <= 50) {
            return (numberEmployees * 4.8).toFixed(2);
        } else {
            return (numberEmployees * 4.5).toFixed(2);
        }
    }

    return (
        <div style={{
            backgroundColor: "#b8c6db",
            backgroundImage: "linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)"
        }}>
            <Container>
                <Row>
                    <Col>
                        <Card style={{backgroundColor: "rgba(228,230,243,0.32)"}}>
                            <Row>
                                <Col sm="8" className="mt-1">
                                    <div className="mt-5">
                                        <h2 style={{textAlign: "center"}} className="mt-3"><strong>CmsSoftware - system do sprawnego zarządzania firmą.</strong></h2>
                                        <p style={{textAlign: "center"}} className="mb-1 mt-5">Zarządzaj pracownikami w łatwy i przyjemny sposób.</p>
                                        <p style={{textAlign: "center"}} className="mt-1 mb-1">CmsSoftware to narzędzie przeznaczone dla firm, które służy do planowania,</p>
                                        <p style={{textAlign: "center"}} className="mt-0">śledzenia aktywnych zadań oraz zarządzania pracownikami.</p>
                                    </div>
                                </Col>
                                <Col sm="4" className="mb-3 mt-3">
                                    <div>
                                        <img src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1039&q=80" className="img-fluid mx-auto d-block rounded shadow p-1 mb-1" alt="header"/>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col className="mt-5 mb-0" sm={"12"}>
                        <div>
                            <h4 style={{textAlign: "center"}}><strong>Wszystkie przypisane zadania w jednym miejscu</strong></h4>
                            <h4 style={{textAlign: "center"}}>Monitoruj postępy pracowników, dzięki <strong>CmsSoftware</strong> żadne zadanie nie zostanie pominięte!</h4>
                        </div>
                        <div className="mt-5">
                            <img src="https://drive.google.com/uc?export=view&id=1elARbGMg9m07EdMrtJoE3diYL8YwO4Iy" className="img-fluid mx-auto d-block rounded shadow p-2 mb-5" alt="Widok zadań"/>
                        </div>
                    </Col>
                    <Col>
                        <Card style={{backgroundColor: "rgba(244,244,248,0.8)"}} className="mb-5">
                            <h3 style={{textAlign: "center"}}>Dopasuj system do swoich potrzeb</h3>
                            <h3 style={{textAlign: "center"}}>Cena za <strong>{numberEmployees}</strong> pracowników to <strong>{priceFunction()}</strong>zł miesięcznie.</h3>
                            <Row className="justify-content-center">
                                <Col className="mt-2 bg-light col-8">
                                    <label className="mb-1"><h5><Badge>Wybierz ilość pracowników</Badge></h5></label>
                                    <FormRange
                                        min={3}
                                        max={100}
                                        className="mb-2 mt-0"
                                        value={numberEmployees}
                                        onChange={e => setNumberEmployee(e.target.value)}
                                        size='lg'
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
