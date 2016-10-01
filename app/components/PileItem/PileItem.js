import React, { PropTypes } from 'react';
import MenuItem from 'material-ui/MenuItem';

import Article from './Article';
import YoutubeVideo from './YoutubeVideo';

const PileItem = ({
  type,
  ...data
}) => {
  switch (type) {
    case 'article':
      return <Article {...data} />;

    case 'youtube':
      return <YoutubeVideo {...data} />;

    default:
      throw new Error(`Unsupported pile type '${type}'`);
  }
};

export default PileItem;
