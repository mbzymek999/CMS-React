import React, { useState, useEffect } from "react";
import axios from "axios";
import EventBus from "../../../common/EventBus";
import authHeader from "../../../services/auth-header";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Pagination} from "@material-ui/lab";

export default function TasksController() {
    const [task, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);

    const [pageSize, setPageSize] = useState(5);
    const pageSizes = [5, 10, 15];

    useEffect(() => {
        axios.get(`http://localhost:8080/company/tasks?size=${pageSize}&page=${currentPage-1}`, { headers: authHeader() }).then(
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
        <Container className={"mt-5"}>
            <Row>
                <Col>
                    <Link to="/create_task">
                        <Button className="btn btn-primary float-end" size="sm">
                            Dodaj nowe zadanie
                        </Button>
                    </Link>
                    <Table striped bordered hover className={"bg-light"}>
                        <thead>
                        <tr>
                            <th scope="col">Nazwa</th>
                            <th scope="col">Typ zadania</th>
                            <th scope="col">Utworzono</th>
                            <th scope="col">Opis</th>
                            <th scope="col">Termin zadania</th>
                            <th scope="col">Pracownik</th>
                        </tr>
                        </thead>
                        <tbody>
                        {task.map((item) =>
                            <>
                                {item.statusTask === 0 ?
                                    <tr className="bg-danger">
                                        <td>{item.name}</td>
                                        <td>{item.type}</td>
                                        <td>{item.createdDate}</td>
                                        <td>{item.description}</td>
                                        <td>{item.dateTo}</td>
                                        <td>{item.employeeName}</td>
                                    </tr>:
                                    item.statusTask === 1 ?
                                    <tr className="bg-warning">
                                        <td>{item.name}</td>
                                        <td>{item.type}</td>
                                        <td>{item.createdDate}</td>
                                        <td>{item.description}</td>
                                        <td>{item.dateTo}</td>
                                        <td>{item.employeeName}</td>
                                    </tr> :
                                    <tr className="bg-success">
                                        <td>{item.name}</td>
                                        <td>{item.type}</td>
                                        <td>{item.createdDate}</td>
                                        <td>{item.description}</td>
                                        <td>{item.dateTo}</td>
                                        <td>{item.employeeName}</td>
                                    </tr>
                                }
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