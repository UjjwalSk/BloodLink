import React from 'react';
import { Link } from "react-router-dom";

const DropDown = (props) => {
    const s1 = "rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap font-semibold hover:bg-blood hover:text-white-900";
    const s2 =
    "px-6 py-2 font-semibold text-base rounded-full group-hover:px-12 group-hover:drop-shadow-2xl shadow-sm bg-blood z-30 text-white-900 hover:drop-shadow-md hover:opacity-80";

    return (
    <div className="group inline-block relative">
    <button
      className="text-gray-700 font-semibold mx-4 rounded inline-flex"
    >
      <span className={s2}>
        
        {props.title} &nbsp;
        <svg
            className="fill-current inline h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
        >
            <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
        </svg>

    </span>
      
    </button>
    <ul className="ml-6 px-2 py-2 absolute hidden text-gray-700 pt-1 z-10 group-hover:block w-max bg-white-900 hover:drop-shadow-2xl border-blood hover:border-b-2 dark:bg-white-900 rounded-tl-lg rounded-b-lg">
        {
            props.children.map((e,i)=>{
                return (
                    <li><Link to={props.links[i]} className={s1}>{e}</Link></li>
                )
            })
        }
    </ul>
</div>  )
}

export default DropDown