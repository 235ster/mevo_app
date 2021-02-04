import {Popup} from 'react-map-gl';
import React from 'react';
import './VehiclePopup.css'

const VehiclePopup = ({latitude, longitude, onVehiclePopupClose, location}) => {
	return (
        <Popup latitude={latitude} longitude={longitude} 
        onClose={(e)=>{
        	onVehiclePopupClose();          
        }}>
          <div>
            <h4>{location}</h4>
          </div>
        </Popup>
	)

}
export default VehiclePopup;