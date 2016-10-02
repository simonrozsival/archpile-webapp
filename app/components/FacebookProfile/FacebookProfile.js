import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';

export const facebookProfileUrl = (fbid) =>
  `https://graph.facebook.com/${fbid}/picture`;

const FacebookProfile = ({
  fbid,
  name,
  ...props
}) => (
  <FlatButton
    icon={<Avatar src={facebookProfileUrl(fbid)} size={25} alt={name} />}
    label={name} />
);

export default FacebookProfile;
