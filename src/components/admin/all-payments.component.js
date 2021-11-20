import React, { useState, useEffect } from "react";
import axios from "axios";
import EventBus from "../../../src/common/EventBus";
import authHeader from "../../services/auth-header";

export default function AllPaymentsController() {
    const [content, setContent] = useState([]);
    // let history = useHistory();

    useEffect(() => {
        axios.get("http://localhost:8080/payments", { headers: authHeader() }).then(
            (response) => {
                setContent(response.data);
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
    }, []);


    // const totalItems = content.length

    // const deletePayments = (shoesId) => {
    //     axios.delete("http://localhost:8080/api/shoes/adminshoes?index="+shoesId, { headers: authHeader() })
    //         .then(res => {
    //             if(res.data != null) {
    //                 alert("shoes deleted!")
    //                 setContent(content.filter(shoes => shoes.id !== shoesId))
    //             }
    //         })
    // }

    return (
        <div className="pt-2 d-flex justify-content-center">
            <div className="border w-75 p-3">
                <label className="font" style={{ fontWeight: "bold" }}>Lista płatności</label><br />
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Id płatności</th>
                        <th scope="col">Cena</th>
                        <th scope="col">Płatność opłacona</th>
                    </tr>
                    </thead>
                    <tbody>
                    {content.map((item) =>
                        <tr>
                            <td>{item.paymentId}</td>
                            <td>{item.price}</td>
                            <td>{item.paymentDone}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>

    );
}