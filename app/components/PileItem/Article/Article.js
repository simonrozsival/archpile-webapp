import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { facebookProfileUrl } from '../../FacebookProfile';

const makePeekUrl = (url, size = 64) =>
  `https://icons.better-idea.org/icon?url=${encodeURIComponent(url)}&size=${size}`;

const Article = ({
  url,
  author
}) => (
  <ListItem
    primaryText='Odkaz na článek'
    secondaryText={url}
    leftAvatar={<Avatar src={makePeekUrl(url)} />}
    rightAvatar={<Avatar src={facebookProfileUrl(author.fbid)} />} />
);

export default Article;
