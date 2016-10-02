import React, { PropTypes } from 'react';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Divider from 'material-ui/Divider';
import PileItem from '../PileItem';
import StreetPeek from '../StreetPeek';
import PlaceName from '../PlaceName';

import { lonLatShape } from '../../helpers';
import FacebookComments from '../FacebookComments';

const Pile = ({
  uid,
  coords,
  categorizedItems,
  onClose,
  supressDiscussion = false,
  children = null
}) => (
  <div>
    <AppBar
      title={<PlaceName {...coords} />}
      iconElementLeft={<IconButton onClick={onClose}><NavigationClose /></IconButton>} />
    <StreetPeek {...coords} />
    {Object.keys(categorizedItems).map(name => (
      <List key={name}>
        <Subheader>{name}</Subheader>
        {categorizedItems[name].map(
          item => <PileItem key={item.uid} {...item} />
        )}
      </List>
    ))}

    {children}

    {!supressDiscussion && <Subheader>Diskuse</Subheader>}
    {!supressDiscussion && <FacebookComments url={`http://localhost:3000/hromady/${uid}`} />}
  </div>
);

Pile.propTypes = {
  coords: lonLatShape
};

export default Pile;
