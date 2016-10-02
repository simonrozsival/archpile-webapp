import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { firebase, helpers } from 'redux-react-firebase';
import { push } from 'react-router-redux';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import Pile from '../../components/Pile';
import styles from './detail.css';
import AddPostForm from '../../components/AddPostForm';

class PlaceDetail extends Component {

  add = (category, title, type, data) => {
    const { firebase, params: { uid }, user } = this.props;
    firebase.push(`piles/${uid}`, {
      category,
      title,
      type,
      ...data,
      author: {
        fbid: user.uid,
        name: user.displayName
      }
    });
  }

  render() {
    const {
      uid,
      isLoading,
      coords,
      pile,
      leaveDetail
    } = this.props;

    if (isLoading) {
      return (
        <Pile coords={coords} categorizedItems={{}} onClose={leaveDetail} />
      );
    }

    return (
      <Pile coords={coords} categorizedItems={pile} onClose={leaveDetail}>
        <Card style={{ margin: 20 }}>
          <CardHeader
            title='Přidat nový příspěvek'
            subtitle='Přidejte další příspěvek k tomuto místu.'
            actAsExpander={false}
            showExpandableButton={false}
          />
          <CardText expandable={false}>
            <AddPostForm add={this.add} />
          </CardText>
        </Card>
      </Pile>
    );
  }

}

const connectedPlaceDetail = connect(
  ({ firebase }, { params }) => {
    let pileAssoc = helpers.dataToJS(firebase, `piles/${params.uid}`) || {};
    let pileArr = Object.keys(pileAssoc).map(uid => ({ ...pileAssoc[uid], uid }));
    let categorized = {};
    for (let item of pileArr) {
      if (!categorized[item.category]) {
        categorized[item.category] = [];
      }

      categorized[item.category].push(item);
    }

    let place = helpers.dataToJS(firebase, `places/${params.uid}`) || {};

    return {
      user: firebase.get('auth') ? firebase.get('auth').providerData[0] : null,
      isLoading: !helpers.isLoaded(place) || helpers.isEmpty(place),
      ...place,
      pile: categorized
    };
  },
  (dispatch) => ({
    leaveDetail: () => dispatch(push('/'))
  })
)(PlaceDetail);

export default firebase(
  ({ params }) => ([ 'piles', 'places' ])
)(connectedPlaceDetail);
