import React, { PropTypes, Component } from 'react';
import { DivIcon } from 'leaflet';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { firebase, helpers } from 'redux-react-firebase';
import { Map, Marker, TileLayer } from 'react-leaflet';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import styles from './places.css';
import { lonLatShape } from '../../helpers';

class Places extends Component {

  state = { addingMode: false, tmpPin: null };

  togglePlusMode() {
    this.setState({ addingMode: !this.state.addingMode });
  }

  moveTmpPlace(e) {
    const { addPlace } = this.props;
    const { addingMode } = this.state;
    const tmpPin = { coords: e.latlng };
    this.setState({ tmpPin });

    if (addingMode) {
      addPlace(e.latlng.lng, e.latlng.lat);
    }
  }

  render() {
    const {
      center = { lat: 50.068, lon: 14.402 }, // defaults to Prague
      currentPlace = null,
      places = [],
      goToPlace,
      ...props
    } = this.props;

    const {
      addingMode,
      tmpPin
    } = this.state;

    return (
      <div>
        <FloatingActionButton className={styles.floatingButton} onClick={() => this.togglePlusMode()}>
          {addingMode
            ? <NavigationClose secondary />
            : <ContentAdd />}
        </FloatingActionButton>
        <Map
          {...props}
          center={center}
          zoom={13}
          onClick={(e) => this.moveTmpPlace(e)}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />

          {!addingMode && places.map(({ uid, coords, isDisabled }) => (
            <Marker
              key={uid}
              position={coords}
              opacity={isDisabled ? 0.4 : 1}
              onClick={() => goToPlace(uid)} />
          ))}

          {addingMode && tmpPin && (
            <Marker position={tmpPin.coords} />
          )}
        </Map>
      </div>
    );
  }
}


Places.propTypes = {
  addingMode: PropTypes.bool,
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
    goToPlace: (uid) => dispatch(push(`/hromada/${uid}`)),
    addPlace: (lon, lat) => dispatch(push(`/nova-hromada/${lon}/${lat}`))
  })
)(firebaseConnectedPlaces);
