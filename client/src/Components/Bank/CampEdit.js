import React, { useState, useContext } from 'react'
import RegisterBank from './RegisterBank';
import AuthContext from '../context/AuthContext'
import Popup from '../Util/Popup';
import CampsCheck from './CampsCheck';

const CampEdit = (props) => {
    const { user } = useContext(AuthContext);
    const [flag, setFlag] = useState(true);
    const [popup, setPopup] = useState(-1);
    const [sent, setSent] = useState([]);
    const s1 = "mx-2 px-9 py-2 w-max font-semibold rounded-full shadow-sm text-white-900 bg-blood hover:drop-shadow-md hover:opacity-80 cursor-pointer";
    return (
        <div>
            {
                props.popup != -1 && <div className="popup h-[150%] overflow-scroll z-10">
                    <div className='popup_inner rounded-lg p-7 overflow-scroll w-fit'>
                        <div>
                            <h1 className='text-2xl font-bold inline-block'>
                                Camp Donors
                            </h1>
                            <i onClick={() => props.setPopup(-1)} className="fa-solid fa-circle-xmark text-blood fa-xl float-right cursor-pointer hover:opacity-80"></i>
                        </div><br />
                        <div className='grid grid-cols-3 gap-4 w-max'>
                            {
                                props.data.donors.map((k, j) => {
                                    return (
                                        <CampsCheck setSent={setSent} popup={popup} setPopup={setPopup} data={k} camp={props.data._id} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            }
            <Popup popup={popup} setPopup={setPopup} data={sent} handle="User" />
        </div>
    )
}

export default CampEdit