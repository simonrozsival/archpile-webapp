import { PropTypes } from 'react';

export const lonLatShape = PropTypes.shape({
  lon: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired
});
