import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { firebase, helpers } from 'redux-react-firebase';
import { push } from 'react-router-redux';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import Pile from '../../components/Pile';
import AddPostForm from '../../components/AddPostForm';

class AddPlace extends Component {

  addPlace = (category, title, type, data) => {
    const { firebase, user, params: { lon, lat }, cancel, goToPlace } = this.props;
    const newPlace = firebase.push('places', {
      coords: { lon: Number(lon), lat: Number(lat) }
    });

    firebase.push(`piles/${newPlace.key}`, {
      category,
      title,
      type,
      ...data,
      author: {
        fbid: user.uid,
        name: user.displayName
      }
    });

    cancel();
    goToPlace(newPlace.key);
  }

  render() {
    const {
      params,
      user,
      cancel
    } = this.props;

    if (!user) {
      return null; // do not render unless the user is logged in
    }

    return (
      <Pile
        isLoading={false}
        coords={{ lat: Number(params.lat), lon: Number(params.lon) }}
        onClose={cancel}
        categorizedItems={{}}
        supressDiscussion={true}>
          <Card style={{ margin: 20 }}>
            <CardHeader
              title='Přidat nové místo'
              subtitle='Přidejte první příspěvek k tomuto místu.'
              actAsExpander={false}
              showExpandableButton={false}
            />
            <CardText expandable={false}>
              <AddPostForm add={this.addPlace} />
            </CardText>
          </Card>
      </Pile>
    );
  }

}

const connectedAddPlace = connect(
  ({ firebase }, { params }) => {
    return {
      user: firebase.get('auth') ? firebase.get('auth').providerData[0] : null
    };
  },
  (dispatch) => ({
    cancel: () => dispatch(push('/')),
    goToPlace: (id) => dispatch(push(`/hromada/${id}`))
  })
)(AddPlace);

export default firebase(
  ({ params }) => ([ 'piles', 'places' ])
)(connectedAddPlace);
