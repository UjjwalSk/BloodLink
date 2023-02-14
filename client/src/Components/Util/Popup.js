import React from 'react'
import mapboxgl from "mapbox-gl";

const Popup = (props) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY29yb2JvcmkiLCJhIjoiY2s3Y3FyaWx0MDIwbTNpbnc4emxkdndrbiJ9.9KeSiPVeMK0rWvJmTE0lVA';
    return (
        <div>
            {
                props.popup != -1 && <div className="popup h-[150%] overflow-scroll">
                    <div className='popup_inner rounded-lg p-7 overflow-y-scroll'>
                        <div>
                            <h1 className='text-2xl font-bold inline-block'>
                                {props.handle} Details
                            </h1>
                            <i onClick={() => props.setPopup(-1)} className="fa-solid fa-circle-xmark text-blood fa-xl float-right cursor-pointer hover:opacity-80"></i>
                        </div><br />
                        <table className='w-full'>
                            {
                                props.data && <>
                                    {
                                        Object.keys(props.data).map((e) => {
                                            return (
                                                e != "_id" && e != "longitude" && e != "latitude" && <tr className='border'>
                                                    <td className='font-bold p-4 border'>{e[0].toUpperCase() + e.substr(1,)}</td>
                                                    <td className='p-2'>{props.data[e] ? props.data[e] : "---"}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    {props.data.longitude && <tr className='border'>
                                        <td className='font-bold p-4 border'>Location</td>
                                        <td className='p-2'>
                                            {
                                                <div id="map" className="w-full h-[200px]"></div>
                                            }
                                            {
                                                (() => {
                                                    setTimeout(() => {
                                                        new mapboxgl.Marker().setLngLat([props.data.longitude, props.data.latitude]).addTo(new mapboxgl.Map({
                                                            container: 'map', style: 'mapbox://styles/mapbox/streets-v12',
                                                            center: [props.data.longitude, props.data.latitude], zoom: 10.7
                                                        }));
                                                    }, 100)
                                                    return <></>
                                                })()
                                            }
                                        </td>
                                    </tr>}
                                </>
                            }
                        </table>
                    </div>
                </div>
            }
        </div>
    )
}

export default Popup