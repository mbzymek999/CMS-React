import React, { useState, useEffect } from "react";
import axios from "axios";
import EventBus from "../../../common/EventBus";
import authHeader from "../../../services/auth-header";
import {Badge, Button, Col, Container, Modal, Row, Table} from "react-bootstrap";
import {Pagination} from "@material-ui/lab";
import globalUrl from "../../../state/globalUrl";

export default function AllPaymentsController() {
    const [content, setContent] = useState([]);
    const [company, setCompany] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const pageSizes = [5, 10, 15];

    const [paymentDone, setPaymentDone] = useState([]);
    const [paymentDoneFalse, setPaymentDoneFalse] = useState(false);
    const [paymentDoneTrue, setPaymentDoneTrue] = useState(false);


    useEffect(() => {
        axios.get(`${globalUrl().url}/payments/read?size=${pageSize}&page=${currentPage-1}&paymentDone=${paymentDone}`, { headers: authHeader() }).then(
            (response) => {
                setContent(response.data.payments);
                setCount(response.data.totalPages);
            },
            (error) => {
                // history.replace("/")
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }, [currentPage,pageSize, paymentDone]);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setCurrentPage(1);
    };

    const handleFilterPaymentDoneNotPaid = () => {
        setPaymentDoneFalse(!paymentDoneFalse)
        if(paymentDoneTrue)
            setPaymentDoneTrue(!paymentDoneTrue);
        if(!paymentDoneFalse)
            setPaymentDone(false);
        else setPaymentDone([])
    };

    const handleFilterPaymentDonePaid = () => {
        setPaymentDoneTrue(!paymentDoneTrue)
        if(paymentDoneFalse)
            setPaymentDoneFalse(!paymentDoneFalse);
        if(!paymentDoneTrue)
            setPaymentDone(true);
        else setPaymentDone([])
    };

    useEffect(() => {
        axios.get(`${globalUrl().url}/payment/companies`, { headers: authHeader() }).then(
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

        const createPayment = (companyId) => {
            axios.post(`${globalUrl().url}/api/payment?companyId=`+ (companyId), {}, { headers: authHeader() })
                .then((response) => {
                    if (response.data != null) {
                        setShow(true);
                        setTimeout(() => setShow(false), 3000);
                        window.location.reload(false);
                    } else {
                        setShow(false);
                    }
                }).catch(err => {
                console.log(err)
            })
        };

    return (
        <Container className={"mt-5"}>
            <Row>
                <Col>
                    <Badge className="bg-danger">Nieopłacone</Badge>
                    <input
                        type="checkbox"
                        className="m-3"
                        onChange={handleFilterPaymentDoneNotPaid}
                        checked={paymentDoneFalse}
                        style={{
                            transform: "scale(2)",
                        }}
                    />
                    <Badge className="bg-success">Opłacone</Badge>
                    <input
                        type="checkbox"
                        className="m-3"
                        onChange={handleFilterPaymentDonePaid}
                        checked={paymentDoneTrue}
                        style={{
                            transform: "scale(2)",
                        }}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button className="btn btn-primary float-end" size="sm" onClick={handleShow}>
                        Dodaj nową płatność
                    </Button>

                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Wybierz firme z listy</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col>
                                    <Table striped bordered hover className={"bg-light"}>
                                        <thead>
                                        <tr>
                                            <th scope="col">id</th>
                                            <th scope="col">nazwa</th>
                                            <th scope="col">cena</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {company.map((item) =>
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>{item.companyName}</td>
                                                <td>{item.pricePackage} zł</td>
                                                <td>
                                                    <Button className="btn btn-primary float-end" size="sm" onClick={() => createPayment(item.id)}>Dodaj płatność</Button>
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            {/*<Button onClick={createPayment(1)}>*/}
                            {/*    Zapisz*/}
                            {/*</Button>*/}
                            <Button variant="secondary" onClick={handleClose}>
                                zamknij
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped className="table border">
                        <thead>
                        <tr>
                            <th></th>
                            <th scope="col">Id płatności</th>
                            <th scope="col">Termin płatności</th>
                            <th scope="col">Data wystawienia</th>
                            <th scope="col">Cena</th>
                            <th scope="col">Płatność opłacona</th>
                            <th scope="col">Nazwa firmy</th>
                        </tr>
                        </thead>
                        <tbody>
                        {content.map((item) =>
                            <>{item.paymentDone ?
                                <tr>
                                    <td style={{background: 'forestgreen'}}></td>
                                    <td>{item.paymentId}</td>
                                    <td>{item.datePayment}</td>
                                    <td>{item.termPayment}</td>
                                    <td>{item.price} zł</td>
                                    <td>{item.paymentDone ? "Tak" : "Nie"}</td>
                                    <td>{item.companyName}</td>
                                </tr> :
                                <tr>
                                    <td style={{background: 'crimson'}}></td>
                                    <td>{item.paymentId}</td>
                                    <td>{item.datePayment}</td>
                                    <td>{item.termPayment}</td>
                                    <td>{item.price} zł</td>
                                    <td>{item.paymentDone ? "Tak" : "Nie"}</td>
                                    <td>{item.companyName}</td>
                                </tr>}
                            </>
                        )}
                        </tbody>
                    </Table>
                    <hr/>
                    {"Ilość wyświetlanych elementów: "}
                    <select onChange={handlePageSizeChange} value={pageSize} className="mb-2 form-select form-select-sm w-25">
                        {pageSizes.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                    <Pagination
                        variant="outlined"
                        shape="rounded"
                        count={count}
                        page={currentPage}
                        onChange={handleChange}
                        size='medium'
                        color='primary'
                    />
                </Col>
            </Row>
        </Container>

    );
}