import React from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const makePeekUrl = (url, size = 64) =>
  `https://icons.better-idea.org/icon?url=${encodeURIComponent(url)}&size=${size}`;

const Edesky = ({
  edeskyUrl,
  municipalityName,
  title
}) => (
  <ListItem
    href={edeskyUrl}
    target='_blank'
    primaryText={title}
    secondaryText={municipalityName}
    leftAvatar={<Avatar src={makePeekUrl(edeskyUrl)} />}
    rightAvatar={<Avatar src='https://thumbs.dreamstime.com/x/d-robot-plays-electric-guitar-render-playing-65595406.jpg' />} />
);

export default Edesky;
