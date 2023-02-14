import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext'
import UserNav from '../User/UserNav';
import EditProfile from './EditProfile';
import History from '../Util/History';
import RegisterBank from './RegisterBank';
import Camps from './Camps';
import Stock from './Stock';

const Bank = (props) => {
    const { user } = useContext(AuthContext);
    const { handle } = useParams();
    const nav = [{ to: "/bank/profile", icon: "fa-user", title: "Bank Profile" },
    { to: "/bank/stock", icon: "fa-layer-group", title: "Blood Stock" },
    { to: "/bank/donations", icon: "fa-hand-holding-medical", title: "Donations" },
    { to: "/bank/requests", icon: "fa-clock-rotate-left", title: "Requests" },
    { to: "/bank/camps", icon: "fa-clock-rotate-left", title: "Blood Donation Camps" },
    { to: "/bank/registerBank", icon: "fa-rotate", title: "Register new Camp" }];
    return (
        <div className='flex w-full h-96'>
            <UserNav data={nav} />
            <div className='ml-96 w-full flex justify-center pr-24'>
                {handle === "profile" && <EditProfile />}
                {handle === "stock" && <Stock />}
                {handle === "donations" && <History user="bank" handle={handle} />}
                {handle === "requests" && <History user="bank" handle={handle} />}
                {handle === "camps" && <Camps />}
                {handle === "registerBank" && <RegisterBank todo="register" bank={user} />}
            </div>
        </div>
    )
}

export default Bank