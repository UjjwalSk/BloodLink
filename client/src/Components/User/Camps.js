import React, { useState, useEffect } from 'react'
import data from "../../assets/data.json";
import axios from "../Api"

const Camps = () => {

    const [state, setState] = useState(0);
    const [district, setDistrict] = useState(0);
    const [camps, setCamps] = useState([]);
    useEffect(() => {
        fetch(data.states[state].state, data.states[state].districts[district]);
    }, []);

    const fetch = async (s, d) => {
        await axios.get(`/camps/${s}/${d}`).then((res) => {
            setCamps(res.data);
        }).catch((err) => {
            alert("Something went wrong")
        });
    }

    const register = async (i) => {
        await axios.put(`/camps/${i}`).then((res) => {
            alert("Registered for blood bank");
        }).catch((e) => {
            alert("Something went wrong");
        })
    };

    return (
        <div>
            <div className="grid grid-cols-2 gap-4 items-center">
                <div>
                    <label for="state" className="font-semibold  leading-8">State:<font color="red">*</font></label>
                    <select name="state" id="state" onChange={(e) => { setState(e.target.value); setDistrict(0); fetch(data.states[e.target.value].state, data.states[e.target.value].districts[0]); }} className="w-full p-3 text-md border border-silver rounded">
                        {
                            data.states.map((e, i) => <option value={i} selected={state === i}>{e.state}</option>)
                        }
                    </select>
                </div>

                <div><label for="district" className="font-semibold  leading-8">District:<font color="red">*</font></label>
                    <select name="district" id="district" onChange={(e) => { setDistrict(e.target.value); fetch(data.states[state].state, data.states[state].districts[e.target.value]); }} className="w-full p-3 text-md border border-silver rounded">
                        {
                            data.states[state].districts.map((e, i) => <option value={i} selected={district === i}>{e}</option>)
                        }
                    </select>
                </div>
                <table className='w-max rounded-md text-center'>
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
                        {camps.map((e) =>
                            <tr>
                                <td className='border p-3'>{new Date(e.date).toLocaleDateString()}</td>
                                <td className='border p-3'>{e.name}</td>
                                <td className='border p-3'>{e.address}</td>
                                <td className='border p-3'>{e.state}</td>
                                <td className='border p-3'>{e.district}</td>
                                <td className='border p-3'>{e.organizer}</td>
                                <td className='border p-3'>{e.contact}</td>
                                <td className='border p-3'><large><code>{e.startTime + "-" + e.endTime}</code></large></td>
                                <td className="border p-3"><span className="border px-4 py-2 rounded-md text-blood cursor-pointer hover:bg-blood hover:text-white-900" onClick={() => register(e._id)}>Register</span></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Camps