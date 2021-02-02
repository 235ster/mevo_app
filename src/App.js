import './App.css';
import ReactMapGL, {Marker, NavigationControl} from 'react-map-gl';
import React, {useState, useEffect} from 'react';


const navControlStyle= {
  right: 10,
  top: 10
};

function App() {
  const MAPBOX_API_TOKEN='pk.eyJ1IjoiMjM1c3RlciIsImEiOiJja2tpNGVkdHgwbXVqMzFvZGthNzFlNzRmIn0.87buL0bck5pMP-WJbWGSeQ';
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    longitude: 174.763401,
    latitude: -41.29391,
    zoom:12
  });
  const [cordinates, setCordinates]= useState([]);

  useEffect(() => {
    fetch('https://api.mevo.co.nz/public/vehicles/all')
    .then(response => response.json())
    .then (result => setCordinates(result));
  }, [])

  const vehicleCordinates=cordinates.map(vehicle => vehicle.position);
  console.log("Vehicle cordinates retrieved from API are", vehicleCordinates);  

  return ( vehicleCordinates.length ?
    <div className="App">
      <ReactMapGL {...viewport} 
      mapboxApiAccessToken={MAPBOX_API_TOKEN} 
      onViewportChange={viewport => {
        setViewport(viewport)
      }}
      mapStyle={'mapbox://styles/mapbox/basic-v9'}
      > 
      {vehicleCordinates.map(eachVehicle => {
        return (
          <Marker /* key={park.properties.PARK_ID} */ longitude={Number(eachVehicle.longitude)} latitude={Number(eachVehicle.latitude)}>
            <button className="btn-marker">
              <img src="https://assets.mevo.co.nz/vehicles/pin-vehicle-available.png" alt="Vehicle marker"/>
            </button>
          </Marker>
          )
      })}
      <NavigationControl style={navControlStyle} />
      </ReactMapGL>    
    </div> :
    <div> Loading....</div>
  );
}

export default App;
