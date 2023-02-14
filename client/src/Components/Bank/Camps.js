import React, { useState, useEffect } from "react";
import axios from "../Api";
import CampEdit from "./CampEdit";

const Camps = () => {
    const [data, setData] = useState([]);
    const [popup, setPopup] = useState(-1);
    useEffect(() => {
        axios.get("/camps").then((res) => {
            setData(res.data);
        }).catch((err) => {
            alert("Something went wrong")
        });
    }, []);
    return (
        <div className="mt-5 ml-5">
            <table className='rounded-md text-center'>
                <thead>
                    <th className='border p-4 px-4'>Date</th>
                    <th className='border p-4 px-4'>Camp Name</th>
                    <th className='border p-4 px-4'>Address</th>
                    <th className='border p-4 px-4'>State</th>
                    <th className='border p-4 px-4'>District</th>
                    <th className='border p-4 px-4'>Organizer</th>
                    <th className='border p-4 px-4'>Contact</th>
                    <th className='border p-4 px-4'>Time</th>
                </thead>
                <tbody>
                    {data.map((e, i) =>
                        <tr>
                            <td className='border p-3'>{new Date(e.date).toLocaleDateString()}</td>
                            <td className='border p-3'>{e.name}</td>
                            <td className='border p-3'>{e.address}</td>
                            <td className='border p-3'>{e.state}</td>
                            <td className='border p-3'>{e.district}</td>
                            <td className='border p-3'>{e.organizer}</td>
                            <td className='border p-3'>{e.contact}</td>
                            <td className='border p-3'><large><code>{e.startTime + "-" + e.endTime}</code></large></td>
                            <td className="border p-3"><span className="text-purple cursor-pointer" onClick={() => setPopup(i)}><i class="fa-solid fa-pen-to-square"></i> Edit</span></td>
                        </tr>
                    )}
                </tbody>
            </table>
            <CampEdit popup={popup} setPopup={setPopup} data={data[popup]} />
        </div>
    )
}

export default Camps