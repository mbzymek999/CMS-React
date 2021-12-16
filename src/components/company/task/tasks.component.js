import React, { useState, useEffect } from "react";
import axios from "axios";
import EventBus from "../../../common/EventBus";
import authHeader from "../../../services/auth-header";
import {Badge, Button, Col, Container, FormCheck, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Pagination} from "@material-ui/lab";
import {Checkbox} from "@material-ui/core";

export default function TasksController() {
    const [task, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);

    const [pageSize, setPageSize] = useState(5);
    const pageSizes = [5, 10, 15];

    const [statusTask0, setStatusTask0] = useState(false);
    const [statusTask1, setStatusTask1] = useState(false);
    const [statusTask2, setStatusTask2] = useState(false);
    const [statusTask, setStatusTask] = useState(3);

    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8080/company/tasks/read?size=${pageSize}&page=${currentPage-1}&statusTask=${statusTask}`, { headers: authHeader() }).then(
            (response) => {
                setTasks(response.data.tasks);
                setCount(response.data.totalPages);
                console.log(statusTask)
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
    }, [currentPage,pageSize, statusTask]);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setCurrentPage(1);
    };

    const handleChangeCheckbox = e => {
        setIsChecked(!isChecked);
    }

    const handleFilterStatusTaskNotAccepted = () => {
            setStatusTask0(!statusTask0);
            if(statusTask1)
            setStatusTask1(!statusTask1);
            if(statusTask2)
            setStatusTask2(!statusTask2);
            if (!statusTask0)
                setStatusTask(0);
            else setStatusTask(3)

    };

    const handleFilterStatusTaskInProgress = () => {
            setStatusTask1(!statusTask1);
            if(statusTask0)
            setStatusTask0(!statusTask0);
            if(statusTask2)
            setStatusTask2(!statusTask2);
            if (!statusTask1)
                setStatusTask(1);
            else setStatusTask(3)

    };

    const handleFilterStatusTaskDone = () => {
            setStatusTask2(!statusTask2);
            if(statusTask0)
            setStatusTask0(!statusTask0);
            if(statusTask1)
            setStatusTask1(!statusTask1);
            if (!statusTask2)
                setStatusTask(2);
            else setStatusTask(3)
    };

    return (
        <Container className={"mt-5"}>
            <Row>
                <Col>
                    <Badge className="bg-danger">Niezaakcpeptowane</Badge>
                    <input
                        type="checkbox"
                        className="m-3"
                        onChange={handleFilterStatusTaskNotAccepted}
                        checked={statusTask0}
                        style={{
                            transform: "scale(2)",
                        }}
                    />
                    <Badge className="bg-warning">W trakcie</Badge>
                    <input
                        type="checkbox"
                        className="m-3"
                        onChange={handleFilterStatusTaskInProgress}
                        checked={statusTask1}
                        style={{
                            transform: "scale(2)",
                        }}
                    />
                    <Badge className="bg-success">Wykonane</Badge>
                    <input
                        type="checkbox"
                        className="m-3"
                        onChange={handleFilterStatusTaskDone}
                        checked={statusTask2}
                        style={{
                            transform: "scale(2)",
                        }}
                    />
                </Col>
                {/*<input type="checkbox" className="radio" />*/}
                {/*<input type="checkbox" className="radio" onChange={handleFilterStatusTaskDone} checked={statusTask2}/>*/}
            </Row>
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
                            <th></th>
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
                                    <tr>
                                        <td style={{background: 'crimson'}}></td>
                                        <td>{item.name}</td>
                                        <td>{item.type}</td>
                                        <td>{item.createdDate}</td>
                                        <td>{item.description}</td>
                                        <td>{item.dateTo}</td>
                                        <td>{item.employeeName}</td>
                                    </tr>:
                                    item.statusTask === 1 ?
                                    <tr>
                                        <td style={{background: 'gold'}}></td>
                                        <td>{item.name}</td>
                                        <td>{item.type}</td>
                                        <td>{item.createdDate}</td>
                                        <td>{item.description}</td>
                                        <td>{item.dateTo}</td>
                                        <td>{item.employeeName}</td>
                                    </tr> :
                                    <tr>
                                        <td style={{background: 'forestgreen'}}></td>
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