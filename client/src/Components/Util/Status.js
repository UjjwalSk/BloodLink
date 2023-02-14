import React, { useState } from 'react'
import axios from "../Api"

const Status = (props) => {
    const [status, setStatus] = useState(props.status);
    const choices = ['Pending', 'Approved', 'Denied', (props.handle == "donations" ? 'Donated' : "Completed")];
    return (
        <div >
            <select name="status" id="status" onChange={async (k) => {
                if (k.target.value === "Donated") {
                    await axios.put(`/bank/updateStock`, { bloodGroup: props.bloodGroup, units: props.units })
                        .then(async (response) => {
                            alert("Stock Updated");
                            await axios.put(`/bank/${props.handle}`, { id: props.id, status: k.target.value })
                                .then(async (response) => {
                                    setStatus(k.target.value);
                                    props.setId(props.i);
                                    props.setStatus(k.target.value);
                                }, (error) => {
                                    alert("Something went wrong");
                                });
                        }, (error) => {
                            alert("Something went wrong");
                        });
                } else if (k.target.value === "Completed") {
                    await axios.put(`/bank/deleteStock`, { bloodGroup: props.bloodGroup, units: props.units })
                        .then(async (response) => {
                            alert("Stock Updated");
                            await axios.put(`/bank/${props.handle}`, { id: props.id, status: k.target.value })
                                .then(async (response) => {
                                    setStatus(k.target.value);
                                    props.setId(props.i);
                                    props.setStatus(k.target.value);
                                }, (error) => {
                                    alert("Something went wrong");
                                });
                        }, (e) => {
                            alert(e.request.status == 404 ? "Not Enough Blood" : "Something went wrong");
                        });
                } else {
                    await axios.put(`/bank/${props.handle}`, { id: props.id, status: k.target.value })
                        .then(async (response) => {
                            setStatus(k.target.value);
                            props.setId(props.i);
                            props.setStatus(k.target.value);
                        }, (error) => {
                            alert("Something went wrong");
                        });
                }
            }}
                disabled={status == "Denied" || status == "Donated" || status == "Completed"}
                className={(status == "Pending" ? "border-metal text-metal" : (status == "Approved" ? "border-yellowX text-yellowX " : (status == "Denied" ? "border-red text-red" : "border-green text-green"))) + ' border-2 px-4 py-2 rounded-xl hover:shadow-md cursor-pointer'}
            >
                {
                    choices.map((e) =>
                        <option value={e} selected={status === e}>{e}</option>
                    )
                }
            </select>
        </div >
    )
}

export default Status