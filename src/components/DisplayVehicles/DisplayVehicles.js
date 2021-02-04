import {Marker} from 'react-map-gl';
import React from 'react';
import './DisplayVehicles.css';

const DisplayVehicles = ({longitude, latitude, eachVehicle, vehicleOnButtonClick}) => {
  return(
    <Marker longitude={longitude} latitude={latitude}>
      <button className="btn-marker" 
      onClick= {(e)=> {
        e.preventDefault();
        vehicleOnButtonClick(eachVehicle);
      }}>
        <img src="https://assets.mevo.co.nz/vehicles/pin-vehicle-available.png" alt="Vehicle marker"/>
      </button>
    </Marker>
  )
}
export default DisplayVehicles;