import React, { useState, useEffect } from 'react'
import axios from "../Api";

const CampsCheck = (props) => {
    const [edit, setEdit] = useState(true);
    const [units, setUnits] = useState(props.data.units);
    const [status, setStatus] = useState(props.data.status);
    (() => {
        props.data._id.units = props.data.units;
        props.data._id.status = props.data.status == 0 ? "Pending" : "Donated";
    })();
    return (
        <div className='border border-blood border-2 shadow-md p-4 text-lg w-max rounded-xl'>
            <table>
                <tr>
                    <td>{props.data._id.name}</td>
                    <td className="pl-4">
                        {
                            edit ?
                                <>{props.data.units}</> :
                                <input type="number" min={1} max={250} className='w-12' value={units} onChange={(e) => setUnits(e.target.value)} />
                        }mL
                    </td>
                </tr>
                <tr>
                    <td>{props.data._id.bloodGroup} | {props.data._id.age}yrs</td>
                    <td className="text-right">
                        &nbsp;&nbsp;&nbsp;
                        {edit ?
                            <><i class="fa-solid text-metal fa-circle-info" onClick={() => { props.setPopup(props.popup == -1 ? 1 : -1); props.setSent(props.data._id); }}></i> &nbsp;
                                {status == 0 && <i class="fa-solid text-green fa-pen-to-square" onClick={() => setEdit(false)}></i>}</> :
                            <><i class="fa-solid text-green fa-check" onClick={
                                async () => {
                                    await axios.put(`/camps/${props.camp}/${props.data._id._id}`, { units: units }, { withCredentials: true }).then((r) => {
                                        alert("Updated");
                                        props.data.units = units;
                                        props.data.status = 1;
                                        setUnits(units);
                                        setStatus(1);
                                        setEdit(true);
                                    }).catch((e) => { alert("Something went wrong") })
                                }
                            }></i> &nbsp;
                                <i class="fa-solid fa-xmark text-blood" onClick={() => setEdit(true)}></i></>}
                    </td>
                </tr>
            </table>
        </div >
    )
}

export default CampsCheck