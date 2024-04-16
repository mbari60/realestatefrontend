import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const MapContainer = () => {
  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  const defaultCenter = {
    lat: -1.3277650420147566,
    lng: 36.881728127113924,
  };
  
  const apiKey = "AIzaSyCsb2shTqLGCXogrHhVJ7A-MBay3g6mB80";

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={5}
        center={defaultCenter}
      ></GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;

