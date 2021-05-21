import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

function GoogleMaps({ loaded, google, location, isShowSearch, onChangeLocation }) {
  const { lat, lng } = location;
  const [state, setState] = useState({
    initialLocation: {
      lat: lat,
      lng: lng
    },
    activeMarker: false
  });

  useEffect(() => {
    setState({
      ...state,
      initialLocation: {
        lat: lat,
        lng: lng
      }
    });
  }, [lat, lng]);

  const onMapClicked = (map) => {
    console.log('onMapClicked')
    if (typeof onChangeLocation === 'function') {
      onChangeLocation(map.latLng.lat().toFixed(8), map.latLng.lng().toFixed(8));
      setState({
        ...state,
        initialLocation: {
          lat: map.latLng.lat(),
          lng: map.latLng.lng()
        }
      })
    }
  }

  const renderAutoComplete = (ref) => {
    const configs = { componentRestrictions: { 'country': 'vn' } }
    if (!google || !ref) return;
    const autocomplete = new google.maps.places.Autocomplete(ref, configs);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      if (!place.geometry) return;
      onChangeLocation(
        place.geometry.location.lat().toFixed(8),
        place.geometry.location.lng().toFixed(8)
      )
      setState({
        ...state,
        initialLocation: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
      });
    });
  }

  return (
    <div style={{ height: '60vh', width: '100%', position: 'relative' }}>
      {
        isShowSearch && (
          <input ref={(ref) => renderAutoComplete(ref)} style={{
            zIndex: '99',
            position: 'absolute',
            top: 10, left: '50%',
            transform: 'translateX(-50%)',
            width: '250px',
            height: '35px',
            padding: '0 15px',
            fontFamily: 'inherit',
            fontSize: 16,
            border: 0,
            boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px',
            '&:focus': {
              outline: 0
            }
          }}
          />
        )
      }

      <Map
        google={google}
        containerStyle={{
          position: 'relative'
        }}
        center={state.initialLocation}
        initialCenter={state.initialLocation}
        zoom={18}
        onClick={(t, location, map) => onMapClicked(map)}
      >
        <Marker
          position={state.initialLocation}
        />
      </Map>
    </div>
  );
}

GoogleMaps.defaultProps = {
  location: {
    lat: 10.73277840,
    lng: 106.73525870
  },
  isShowSearch: false
};

GoogleMaps.propTypes = {
  location: PropTypes.shape({
    lat: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    lng: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
  isShowSearch: PropTypes.bool,
  onChangeLocation: PropTypes.func
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAsuQXOP26oS42KchgHGORGZDz6bI-eOZg",
  v: "3"
})(GoogleMaps);
