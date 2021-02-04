import React from 'react';
import {Marker} from 'react-map-gl';
import './CurrentLocation.css'
const CurrentLocation = ({longitude, latitude}) => {
	return(
		<Marker longitude={longitude} latitude={latitude}>
        	<img id="currentLocation" src="https://cdn3.iconfinder.com/data/icons/maps-and-navigation-7/65/68-512.png" alt="My current location"/>
      	</Marker>
	)
}
export default CurrentLocation;