import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { firebase, helpers } from 'redux-react-firebase';
import { push } from 'react-router-redux';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

import Pile from '../../components/Pile';
import styles from './detail.css';

class PlaceDetail extends Component {

  render() {
    const {
      isLoading,
      coords,
      pile,
      leaveDetail
    } = this.props;

    if (isLoading) {
      return <p>Načítají se data...</p>;
    }

    return (
      <div>
        <IconButton
          className={styles.closeDetailButton}
          style={{ position: 'absolute' }}
          onClick={leaveDetail}>
          <NavigationClose />
        </IconButton>
        <Pile coords={coords} items={pile} />
      </div>
    );
  }

}

const connectedPlaceDetail = connect(
  ({ firebase }, { params }) => {
    let pileAssoc = helpers.dataToJS(firebase, `piles/${params.uid}`) || {};
    let pileArr = Object.keys(pileAssoc).map(uid => ({ ...pileAssoc[uid], uid }));
    let place = helpers.dataToJS(firebase, `places/${params.uid}`) || {};

    return {
      isLoading: !helpers.isLoaded(place) || helpers.isEmpty(place),
      ...place,
      pile: pileArr
    };
  },
  (dispatch) => ({
    leaveDetail: () => dispatch(push('/'))
  })
)(PlaceDetail);

export default firebase(
  ({ params }) => ([ 'piles', 'places' ])
)(connectedPlaceDetail);
