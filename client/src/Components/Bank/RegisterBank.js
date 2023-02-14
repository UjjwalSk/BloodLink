import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "../../assets/data.json";
import axios from "../Api";

const RegisterBank = (props) => {
    const [name, setName] = useState("");
    const [organizer, setOrganizer] = useState("");
    const [contact, setContact] = useState(0);
    const [date, setDate] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [state, setState] = useState(0);
    const [district, setDistrict] = useState(0);
    const [address, setAddress] = useState("");
    const navigate = useNavigate();
    const s1 = "mx-2 px-9 py-2 w-4/12 font-semibold rounded-full shadow-sm text-white-900 bg-blood hover:drop-shadow-md hover:opacity-80 cursor-pointer";
    const submit = async (e) => {
        e.preventDefault();
        const formData = {
            name: name,
            organizer: organizer,
            contact: contact,
            date: date,
            startTime: start,
            endTime: end,
            state: data.states[state].state,
            district: data.states[state].districts[district],
            address: address
        }
        if (props.todo === "register") {
            await axios.post("/camps", formData, { withCredentials: true }).then((r) => {
                alert("Registered New Blood Donation Camp ✅");
                navigate("/bank/camps");
            }).catch((e) => {
                alert("Something went wrong");
            })
        } else {
            alert("Edited");
        }
    };

    return (
        <div className="dark:bg-gray-bg pl-8">
            <section className="flex justify-center items-center">
                <div className="bg-white-900 rounded-xl m-2 w-max pb-10">
                    <form
                        className="space-y-7"
                        action=""
                        onSubmit={(e) => submit(e)}
                    >
                        <fieldset className="border border-solid border-gray-300 px-8 py-5">
                            {props.todo == "register" && <legend className="text-2xl font-bold mb-1">
                                &nbsp;New Blood Donation Camp&nbsp;
                            </legend>}
                            <p></p>
                            <fieldset className="border border-solid border-gray-300 px-7 py-5 pb-7">
                                {props.todo == "register" && <legend className="text-2xl font-bold">
                                    &nbsp;Camp Details&nbsp;
                                </legend>}

                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="font-semibold leading-8">Camp Name:<font color="red">*</font></label>
                                        <input
                                            className="w-full p-3 text-md border border-silver rounded"
                                            type="text"
                                            placeholder="Enter camp name"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        /></div>
                                    <div><label className="font-semibold leading-8">Conducted By:<font color="red">*</font></label>
                                        <input
                                            className="w-full p-3 text-md border border-silver rounded"
                                            type="text"
                                            required
                                            disabled
                                            value={props.bank.name}
                                        /></div>
                                    <div><label className="font-semibold leading-8">Organized By:<font color="red">*</font></label>
                                        <input
                                            className="w-full p-3 text-md border border-silver rounded"
                                            type="text"
                                            placeholder="Enter organizer name"
                                            required
                                            value={organizer}
                                            onChange={(e) => setOrganizer(e.target.value)} ś
                                        /></div>
                                    <div><label className="font-semibold  leading-8">Contact: <font color="red">*</font></label>
                                        <input
                                            className="w-full p-3 text-md border border-silver rounded"
                                            type="number"
                                            placeholder="Enter organizer mobile"
                                            required
                                            value={contact}
                                            onChange={(e) => setContact(e.target.value)}
                                        /></div>
                                    <div className="col-span-2 grid grid-cols-3 gap-4">
                                        <div><label className="font-semibold  leading-8">Date:<font color="red">*</font></label>
                                            <input
                                                className="w-full p-3 text-md border border-silver rounded"
                                                type="date"
                                                placeholder="Enter organizer mobile"
                                                required
                                                value={date}
                                                min={new Date().toISOString().split("T")[0]}
                                                onChange={(e) => setDate(e.target.value)}
                                            /></div><div><label className="font-semibold  leading-8">Start time:<font color="red">*</font></label>
                                            <input
                                                className="w-full p-3 text-md border border-silver rounded"
                                                type="time"
                                                placeholder="Enter organizer mobile"
                                                required
                                                value={start}
                                                onChange={(e) => setStart(e.target.value)}
                                            /></div><div><label className="font-semibold  leading-8">End time:<font color="red">*</font></label>
                                            <input
                                                className="w-full p-3 text-md border border-silver rounded"
                                                type="time"
                                                placeholder="Enter organizer mobile"
                                                required
                                                value={end}
                                                onChange={(e) => setEnd(e.target.value)}
                                            /></div>
                                    </div>
                                </div>

                            </fieldset>
                            <br />
                            <fieldset className="border border-solid border-gray-300 px-7 py-5 pb-7">
                                {props.todo == "register" && <legend className="text-2xl font-bold">
                                    &nbsp;Address&nbsp;
                                </legend>}

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label for="state" className="font-semibold  leading-8">State:<font color="red">*</font></label>
                                        <select name="state" id="state" onChange={(e) => { setState(e.target.value); setDistrict(0); }} className="w-full p-3 text-md border border-silver rounded">
                                            {
                                                data.states.map((e, i) => <option value={i} selected={state === i}>{e.state}</option>)
                                            }
                                        </select>
                                    </div>

                                    <div><label for="district" className="font-semibold  leading-8">District:<font color="red">*</font></label>
                                        <select name="district" id="district" onChange={(e) => setDistrict(e.target.value)} className="w-full p-3 text-md border border-silver rounded">
                                            {
                                                data.states[state].districts.map((e, i) => <option value={i} selected={district === i}>{e}</option>)
                                            }
                                        </select></div>
                                    <div className="col-span-2"><label className="font-semibold  leading-8">Address:<font color="red">*</font></label>
                                        <input
                                            className="w-full p-3 text-md border border-silver rounded"
                                            type="text"
                                            placeholder="Enter your complete address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required
                                        /></div>
                                </div>
                            </fieldset>
                            <br />
                            <center><input
                                type="submit"
                                className={s1}
                                value={"Register"}
                            /></center>
                        </fieldset>
                    </form>
                </div>
            </section>
            <br /><br /><br />
        </div>
    );
};

export default RegisterBank;
