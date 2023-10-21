import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CittiesContext";
import { useGeolocation } from "../hooks/useGeoLocation";
import Button from "./Button";

export default function Map() {
  const {cities} = useCities();
  const [mapPosition, sestMapPosition] = useState([40, 0]);
  const [searchParams, setSearchParams] = useSearchParams();
  const {isLoading: isLoadingPosition, position: geolocationPosition, getPosition} = useGeolocation();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(function () {
   if (lat && lng) sestMapPosition([lat, lng]); 
  },[lat, lng])

  useEffect(function() {
    if (geolocationPosition) {
      sestMapPosition([geolocationPosition.lat, geolocationPosition.lng])
    }
  }, [geolocationPosition])
  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type='position' onClick={getPosition}>
        {isLoadingPosition ? "Loading..." : "My position"}
        </Button>
      )}
      <MapContainer
        className={styles.mapContainer}
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
      {cities.map((city)=>(
            <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
      ))}
      <ChangeCenter position={mapPosition}/>
      <DetectClick/>
      </MapContainer>
    </div>
  );
}

function ChangeCenter({position}) {
  const  map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })
}