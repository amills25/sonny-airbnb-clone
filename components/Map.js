import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import "mapbox-gl/dist/mapbox-gl.css";

function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  // Transform the search results obj into the { latitude: 52.516272, longitude: 13.377722 } obj
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    longitude: center.longitude,
    latitude: center.latitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/amills25/cl9rgkiki006614mqokooivyb"
      mapboxAccessToken={process.env.mapbox_key}
      {...viewport}
      onMove={(e) => setViewport(e.viewport)}
      style={{ width: 600, height: 800 }}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="pin"
            >
              📍
            </p>
          </Marker>

          {/* The popup that should show if we click on a marker */}
          {selectedLocation.long === result.long ? (
            <Popup
              closeOnClick={false}
              onClose={() => setSelectedLocation({})}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
