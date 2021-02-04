import {Popup} from 'react-map-gl';
import React from 'react';
import './VehiclePopup.css'

const VehiclePopup = ({latitude, longitude, onVehiclePopupClose}) => {
	return (
        <Popup latitude={latitude} longitude={longitude} 
        onClose={(e)=>{
        	onVehiclePopupClose();          
        }}>
          <div>
            <h4>{/* location */}Uncomment the location in prod kkkkkkkkkkkkkkkkkkkk</h4>
          </div>
        </Popup>
	)

}
export default VehiclePopup;