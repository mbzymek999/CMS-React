import React, { useState, useEffect } from "react";
import axios from "axios";
import EventBus from "../../../common/EventBus";
import authHeader from "../../../services/auth-header";
import {Card, Col, Container, Row} from "react-bootstrap";
import {Pagination} from "@material-ui/lab";
import globalUrl from "../../../state/globalUrl";

export default function TasksEmployeeDone() {
    const [task, setTasks] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    const pageSizes = [6, 12, 18];

    useEffect(() => {
        axios.get(`${globalUrl().url}/employee/tasks/2?size=${pageSize}&page=${currentPage-1}`, { headers: authHeader() }).then(
            (response) => {
                setTasks(response.data.tasks);
                setCount(response.data.totalPages);
            },
            (error) => {
                // history.replace("/")
                const _task =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setTasks(_task);

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }, [currentPage,pageSize]);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setCurrentPage(1);
    };

    return (
        <Container>
            <Row className="mt-0 p-0">
                {task.map((item) =>
                    <Col className="col-4">
                        <Card border="success" style={{ height: '14rem' }} className="mt-3">
                            <Card.Header>{item.name} <span className="float-end">Data: <strong>{item.createdDate}</strong></span></Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <Row className="mb-1">
                                        <Col>
                                            Zadanie: <strong>{item.type}</strong>
                                        </Col>
                                        <Col>
                                            Termin: <strong>{item.dateTo}</strong>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col>
                                            {item.description}
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
                <hr/>
                {"Wyświetl: "}
                <select onChange={handlePageSizeChange} value={pageSize} className="mb-2 ms-2 form-select form-select-sm w-25">
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
            </Row>
        </Container>
    );
}