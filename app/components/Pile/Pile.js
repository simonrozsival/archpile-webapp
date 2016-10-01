import React, { PropTypes } from 'react';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import PileItem from '../PileItem';
import StreetPeek from '../StreetPeek';

import { lonLatShape } from '../../helpers';

const Pile = ({
  coords,
  items
}) => (
  <div>
    <StreetPeek {...coords} />
    <List>
      <Subheader>Články</Subheader>
      {items.map(
        item => <PileItem key={item.uid} {...item} />
      )}
    </List>
  </div>
);

Pile.propTypes = {
  coords: lonLatShape.isRequired
};

export default Pile;
