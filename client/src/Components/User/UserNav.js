import React from 'react'
import { Outlet, Link } from "react-router-dom";

const Temp = (props) => {
    return (
        <>
            <i className={`fa-solid ${props.icon}`}></i>&nbsp;&nbsp;&nbsp; {props.title}
        </>
    )
};

const UserNav = (props) => {
    const s1 = "block m-9 ml-20 px-9 py-2 font-semibold text-lg rounded-full shadow-sm bg-gray text-white-900 hover:drop-shadow-md hover:opacity-80";

    return (
        <div className='fixed'>
            {props.data.map((e) =>
                <Link to={e.to} className={s1}><Temp icon={e.icon} title={e.title} /></Link>
            )}
        </div>
    )
}

export default UserNav