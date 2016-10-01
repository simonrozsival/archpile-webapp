import React, { PropTypes } from 'react';

const googleStreetViewUrl = (lat, lon) =>
 `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${lat},${lon}&fov=90&pitch=10&key=AIzaSyDxJYze_YRs9_49ueBPyTLeI_V381D-kUw`;

const StreetPeek = ({
  lat,
  lon,
  alt = ''
}) => (
  <img src={googleStreetViewUrl(lat, lon)} alt={alt} />
);

StreetPeek.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  alt: PropTypes.string
};

export default StreetPeek;
