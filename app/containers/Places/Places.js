import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { firebase, helpers } from 'redux-react-firebase';
import { Map, Marker, TileLayer } from 'react-leaflet';

import { lonLatShape } from '../../helpers';

const Places = ({
  center = { lat: 50.068, lon: 14.402 }, // defaults to Prague
  currentPlace = null,
  places = [],
  goToPlace,
  ...props
}) => (
  <Map
    {...props}
    center={center}
    zoom={13}>
    <TileLayer
      url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />

    {places.map(({ uid, coords, isDisabled }) => (
      <Marker
        key={uid}
        position={coords}
        opacity={isDisabled ? 0.4 : 1}
        onClick={() => goToPlace(uid)} />
    ))}
  </Map>
);

Places.propTypes = {
  center: lonLatShape,
  places: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string.isRequired,
      coords: lonLatShape,
      isDisabled: PropTypes.bool
    })
  )
};

const firebaseConnectedPlaces = firebase([ 'places' ])(Places);
export default connect(
  ({ firebase }) => {
    const placesAssoc = helpers.dataToJS(firebase, 'places');
    const placesArr = placesAssoc ? Object.keys(placesAssoc).map(uid => ({ ...placesAssoc[uid], uid })) : [];

    return {
      places: placesArr
    };
  },
  (dispatch) => ({
    goToPlace: (uid) => dispatch(push(`/hromada/${uid}`))
  })
)(firebaseConnectedPlaces);
