import React, { PropTypes } from 'react';

export const facebookProfileUrl = (fbid) =>
  `https://graph.facebook.com/${fbid}/picture`;

const FacebookProfile = ({
  fbid,
  name,
  ...props
}) => (
  <span>
    <img {...props} src={facebookProfileUrl(fbid)} alt={name} /> {name}
  </span>
);

export default FacebookProfile;
