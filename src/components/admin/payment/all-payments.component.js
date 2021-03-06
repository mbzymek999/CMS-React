import React, { useState, useEffect } from "react";
import axios from "axios";
import EventBus from "../../../common/EventBus";
import authHeader from "../../../services/auth-header";
import {Badge, Button, Card, Col, Container, Modal, Row, Table} from "react-bootstrap";
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
    const [isLoading, setLoading] = useState(false);


    const [paymentDone, setPaymentDone] = useState([]);
    const [paymentDoneFalse, setPaymentDoneFalse] = useState(false);
    const [paymentDoneTrue, setPaymentDoneTrue] = useState(false);


    useEffect(() => {
        axios.get(`${globalUrl().url}/payments/read?size=${pageSize}&page=${currentPage-1}&paymentDone=${paymentDone}`,
            { headers: authHeader() }).then(
            (response) => {
                setContent(response.data.payments);
                setCount(response.data.totalPages);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);
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
            setLoading(true);
            axios.post(`${globalUrl().url}/api/payment?companyId=`+ (companyId), {}, { headers: authHeader() })
                .then((response) => {
                    if (response.data != null) {
                        setShow(true);
                        setLoading(false);
                        setTimeout(() => setShow(false), 3000);
                        window.location.reload(false);
                    } else {
                        setShow(false);
                        setLoading(false);
                    }
                }).catch(err => {
                setLoading(false);
                console.log(err)
            })
        };

    return (
        <Card className={"mt-5 bg-light"}>
            <Row>
                <Col>
                    <Badge className="bg-danger">Nieop??acone</Badge>
                    <input
                        type="checkbox"
                        className="m-3"
                        onChange={handleFilterPaymentDoneNotPaid}
                        checked={paymentDoneFalse}
                        style={{
                            transform: "scale(2)",
                        }}
                    />
                    <Badge className="bg-success">Op??acone</Badge>
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
                        Dodaj now?? p??atno????
                    </Button>

                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <h4>Wybierz firme z listy</h4>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col>
                                    <Table
                                        striped bordered hover className={"bg-light"}
                                    >
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
                                                <td>{item.pricePackage} z??</td>
                                                <td>
                                                    <div style={{textAlign: "center"}}>
                                                        { !isLoading &&
                                                            <Button
                                                                className="btn btn-primary"
                                                                size="sm"
                                                                onClick={() => createPayment(item.id)}
                                                            >Dodaj p??atno????</Button>
                                                        }
                                                        { isLoading &&
                                                            <Button
                                                                className="btn btn-primary"
                                                                disabled
                                                                type="submit"
                                                                size="sm"
                                                            >
                                                        <span className="spinner-border spinner-border-sm" role="status"
                                                              aria-hidden="true"/>
                                                                Dodaj p??atno????...
                                                            </Button>
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
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
                            <th scope="col">Termin p??atno??ci</th>
                            <th scope="col">Data wystawienia</th>
                            <th scope="col">Cena</th>
                            <th scope="col">P??atno???? op??acona</th>
                            <th scope="col">Nazwa firmy</th>
                        </tr>
                        </thead>
                        <tbody>
                        {content.map((item) =>
                            <>{item.paymentDone ?
                                <tr>
                                    <td style={{background: 'forestgreen'}}></td>
                                    <td>{item.termPayment}</td>
                                    <td>{item.datePayment}</td>
                                    <td>{item.price} z??</td>
                                    <td>{item.paymentDone ? "Tak" : "Nie"}</td>
                                    <td>{item.companyName}</td>
                                </tr> :
                                <tr>
                                    <td style={{background: 'crimson'}}></td>
                                    <td>{item.termPayment}</td>
                                    <td>{item.datePayment}</td>
                                    <td>{item.price} z??</td>
                                    <td>{item.paymentDone ? "Tak" : "Nie"}</td>
                                    <td>{item.companyName}</td>
                                </tr>}
                            </>
                        )}
                        </tbody>
                    </Table>
                    <hr/>
                    {"Ilo???? wy??wietlanych element??w: "}
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
        </Card>

    );
}