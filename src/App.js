import './App.css';
import ReactMapGL, {Marker, NavigationControl, Popup} from 'react-map-gl';
import React, {useState, useEffect} from 'react';
import Geocoder from 'react-native-geocoding';
import distance from 'google-distance-matrix';
import CurrentLocation from './components/CurrentLocation/CurrentLocation';
import DisplayVehicles from './components/DisplayVehicles/DisplayVehicles';
import VehiclePopup from './components/VehiclePopup/VehiclePopup'

function App() {
  const [cordinates, setCordinates]= useState([]);
  const [vehicle, selectedVehicle]= useState(null);
  const [location, setLocation]= useState(null);

  //My current location cordinates
  var origin = {
    latitude : -41.29391,
    longitude : 174.763401
  }

  const MAPBOX_API_TOKEN= process.env.REACT_APP_MAPBOX_API;
  const GOOGLE_API_TOKEN= process.env.REACT_APP_GOOGLE_API;


  const vehicleOnButtonClick = (eachVehicle) => {
      selectedVehicle(eachVehicle);
      setLocation(null);
      locationAddress(eachVehicle); 
  }

//For measure distance between cordinates

// var origins = ['-41.275522,174.763401'];
// var destinations = ['-41.329505,174.812767', '-41.294412,174.774179'];
// distance.key(GOOGLE_API_TOKEN);
// distance.units('metric');

// distance.matrix(origins, destinations, function (err, distances) {
//     if (err) {
//         return console.log(err);
//     }
//     if(!distances) {
//         return console.log('no distances');
//     }
//     if (distances.status == 'OK') {
//       console.log("Distance is",distances)
//     }
// });

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    longitude: origin.longitude,
    latitude: origin.latitude,
    zoom:13
  });

  const mapClick= (e) =>{
  if(e.target.localName !== 'img'){
    selectedVehicle(null);
    setLocation(null);
  }
}

const onVehiclePopupClose= () => {
  selectedVehicle(null);
  setLocation(null);
}

//Retrieving the location of vehicle using cordinates
const locationAddress = ({longitude, latitude}) => {
  Geocoder.init(GOOGLE_API_TOKEN);
  Geocoder.from(latitude, longitude)
    .then(json => {
            var addressComponent = json.results[0].formatted_address;
            setLocation(addressComponent);
    })
    .catch(error => console.warn(error));
}

  useEffect(() => {
    fetch('https://api.mevo.co.nz/public/vehicles/all')
    .then(response => response.json())
    .then (result => setCordinates(result));  
  }, [])

  const vehicleCordinates=cordinates.map(vehicle => vehicle.position);
 
  return ( vehicleCordinates.length ?
    <div className="App" onClick={(e)=>{mapClick(e)}}>
      <ReactMapGL {...viewport} 
      mapboxApiAccessToken={MAPBOX_API_TOKEN} 
      onViewportChange={viewport => {setViewport(viewport)}}
      mapStyle={'mapbox://styles/mapbox/basic-v9'}> 

      <CurrentLocation longitude={origin.longitude} latitude={origin.latitude} /> 

      {vehicleCordinates.map(eachVehicle => {
        return (
          <DisplayVehicles key={Number(eachVehicle.longitude)} 
            longitude={Number(eachVehicle.longitude)} 
            latitude={Number(eachVehicle.latitude)} eachVehicle={eachVehicle} vehicleOnButtonClick={vehicleOnButtonClick} />
        )
      })}

      {(vehicle) ? <VehiclePopup location={location} latitude={Number(vehicle.latitude)} longitude={Number(vehicle.longitude)} onVehiclePopupClose={onVehiclePopupClose} /> : null }
      <NavigationControl/>
      </ReactMapGL>    
    </div> :
    <div id="pageLoading"> 
      <img id="imgLoading" src="https://media.tenor.com/images/e9666fa015f403a882f069b9234995cc/tenor.gif" width="300" height="300"/>
    </div>
  );
}

export default App;
