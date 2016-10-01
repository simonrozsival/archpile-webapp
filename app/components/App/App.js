import React from 'react';
import styles from './app.css';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Places from '../../containers/Places';


const App = ({
  children
}) => (
  <div>
    <AppBar title='ArchPile' />

    <Drawer open={!!children} className={styles.drawer} width={600}>
      {children}
    </Drawer>

    <Places className={styles.map} />
  </div>
);

App.propTypes = {
};

export default App;
