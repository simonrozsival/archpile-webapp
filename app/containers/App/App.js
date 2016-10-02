import React, { Component } from 'react';
import { connect } from 'react-redux';
import Firebase from 'firebase';
import { firebase, helpers } from 'redux-react-firebase';
import styles from './app.css';

import Avatar from 'material-ui/Avatar';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import CityIcon from 'material-ui/svg-icons/social/location-city';
import AddPin from 'material-ui/svg-icons/maps/add-location';
import Places from '../Places';
import { facebookProfileUrl } from '../../components/FacebookProfile';
import SmartDrawer from '../../components/SmartDrawer';


class App extends Component {

  login() {
    // const { firebase } = this.props;
    const provider = new Firebase.auth.FacebookAuthProvider();
    Firebase.auth().signInWithPopup(provider);
  }

  logout() {
    // this.setState({ addNewPin: false });
    // Firebase.auth().signOut();
    // @todo Implement this - it is not really necessary for the demo, but might be good to have in the future
    // -> the issue is that the state is completely erased when logging out by the redux-react-firebase library...
  }

  getFbData() {
    const { user } = this.props;
    return user ? user.providerData[0] : null;
  }

  isLoggedIn() {
    return this.getFbData() !== null;
  }

  renderUsersProfile() {
    const user = this.getFbData();
    return user && (
      <FlatButton
        icon={<Avatar src={facebookProfileUrl(user.uid)} size={25} alt={user.displayName} />}
        onClick={() => this.logout()}
        label={user.displayName} />
    );
  }

  render() {
    const {
      children,
      auth
    } = this.props;

    return (
      <div>
        <AppBar
          title='VizePrahy'
          iconElementLeft={
            <IconButton><CityIcon /></IconButton>
          }
          iconElementRight={
            this.isLoggedIn()
              ? this.renderUsersProfile()
              : <FlatButton label='Login' onClick={() => this.login()} />
          } />

        <SmartDrawer className={styles.drawer} maxWidth={600}>
          {children}
        </SmartDrawer>

        <Places className={styles.map} />
      </div>
    );
  }

}

App.propTypes = {
};

const firebaseConnectedApp = firebase()(App);
export default connect(
  (state) => ({ user: state.firebase.get('auth') })
)(firebaseConnectedApp);
