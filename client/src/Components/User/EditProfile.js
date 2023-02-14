import React, { useState, useEffect, useContext } from "react";
import data from "../../assets/data.json";
import { useParams } from "react-router-dom";
import axios from "../Api";
import AuthContext from "../context/AuthContext";

const EditProfile = () => {
    const { handle } = useParams();
    const { getLoggedIn, user } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("male");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [state, setState] = useState(0);
    const [district, setDistrict] = useState(0);
    const [address, setAddress] = useState("");
    const [blood, setBlood] = useState(0);
    const [edit, setEdit] = useState(true);
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    useEffect(() => {
        setName(user.name);
        setAge(user.age);
        setGender(user.gender);
        setMail(user.email);
        setPhone(user.phone);
        data.states.map((e, i) => {
            if (e.state === user.state) {
                setState(i);
                setDistrict(e.districts.indexOf(user.district));
            }
        });
        setPassword("Lorem ipsum dolor sit amet consectetur adipisicing elit.");
        setAddress(user.address);
        setBlood(bloodGroups.indexOf(user.bloodGroup));
    }, []);

    const update = async (e) => {
        const formData = {
            name: name,
            age: age,
            gender: gender,
            bloodGroup: bloodGroups[blood],
            email: mail,
            phone: phone,
            state: data.states[state].state,
            district: data.states[state].districts[district],
            address: address,
        };

        await axios.put(`/user/`, formData)
            .then(async (response) => {
                setEdit(!edit);
                await getLoggedIn();
                alert("User updated successfully");

            }, (error) => {
                alert("User not updated");
            });
    };

    return (
        <div>
            <section className="flex justify-center items-center">
                <form
                    className="space-y-2"
                    action=""
                    onSubmit={(e) => { e.preventDefault(); update(); }}
                >
                    <p className=""></p>
                    <table className="w-full" cellPadding={15}>
                        <tr>
                            <td>
                                <label className="font-semibold  leading-8">Name:<font color="red">*</font></label>
                                <input
                                    className="w-full p-3 text-md border border-silver rounded"
                                    type="text"
                                    placeholder="Enter your full name"
                                    required
                                    disabled={edit}
                                    value={name}
                                    onChange={(e) => { setName(e.target.value) }}
                                /></td>
                            <td>
                                <label className="font-semibold  leading-8">Age:<font color="red">*</font></label>
                                <input
                                    className="w-full p-3 text-md border border-silver rounded"
                                    type="number"
                                    placeholder="Enter your age"
                                    required
                                    disabled={edit}
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                /></td><td>
                                <label for="gender" className="font-semibold  leading-8">Gender:<font color="red">*</font></label>
                                <select name="gender" id="gender" disabled={edit} onChange={(e) => setGender(e.target.value)} className="w-full p-3 text-md border border-silver rounded" >
                                    <option value="male" selected={gender === "male"}>Male</option>
                                    <option value="female" selected={gender === "female"}>Female</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="blood" className="font-semibold  leading-8">Blood Group:<font color="red">*</font></label>
                                <select name="blood" id="state" disabled={edit} onChange={(e) => setBlood(e.target.value)} className="w-full p-3 text-md border border-silver rounded">
                                    {
                                        bloodGroups.map((e, i) => <option value={i} selected={blood === i}>{e}</option>)
                                    }
                                </select>
                            </td><td>
                                <label className="font-semibold leading-8">Mobile:<font color="red">*</font></label>
                                <input
                                    className="w-full p-3 text-md border border-silver rounded"
                                    type="number"
                                    placeholder="Enter your mobile"
                                    required
                                    disabled={edit}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </td>
                            <td className="absolute"><button
                                type="button"
                                onClick={() => { setEdit(!edit); }}
                                className="w-44 mt-8 px-7 py-2 bg-blood text-white-900 hover:bg-gray-darkest rounded-full text-lg font-bold align-bottom"
                            >
                                {edit ? "Edit" : "Cancel"}
                            </button><br /><button
                                type="submit"
                                className={`w-44 mt-8 px-7 py-2 bg-blood text-white-900 hover:bg-gray-darkest rounded-full text-lg font-bold align-bottom ${edit && "hidden"}`}
                            >
                                    Save
                                </button></td>
                        </tr>
                        <tr>
                        </tr>
                        <tr>
                            <td>
                                <label className="font-semibold  leading-8">Password:</label><font color="red">*</font>
                                <input
                                    className="w-full p-3 text-md border border-silver rounded"
                                    type="password"
                                    placeholder="Enter your password"
                                    required
                                    disabled
                                    // disabled={edit}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </td>
                            <td>
                                <label className="font-semibold  leading-8">Email:</label>
                                <input className="w-full p-3 text-md border border-silver rounded" type="email" placeholder="Enter your email" disabled={edit} value={mail} onChange={(e) => setMail(e.target.value)}
                                />
                            </td> </tr>
                        <tr>
                            <td>
                                <label for="state" className="font-semibold  leading-8">State:<font color="red">*</font></label>
                                <select name="state" id="state" disabled={edit} onChange={(e) => { setState(e.target.value); setDistrict(0); }} className="w-full p-3 text-md border border-silver rounded">
                                    {
                                        data.states.map((e, i) => <option value={i} selected={state === i}>{e.state}</option>)
                                    }
                                </select>
                            </td>
                            <td>
                                <label for="district" className="font-semibold  leading-8">District:<font color="red">*</font></label>
                                <select name="district" id="district" disabled={edit} onChange={(e) => setDistrict(e.target.value)} className="w-full p-3 text-md border border-silver rounded">
                                    {
                                        data.states[state].districts.map((e, i) => <option value={i} selected={district === i}>{e}</option>)
                                    }
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <label className="font-semibold  leading-8">Address:</label>
                                <input
                                    className="w-full p-3 text-md border border-silver rounded"
                                    type="text"
                                    placeholder="Enter your address"
                                    disabled={edit}
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </td>
                        </tr>
                    </table>
                </form>
            </section>
        </div>
    )
}

export default EditProfile