import React, { Component } from 'react';

class PlaceName extends Component {

  state = { name: 'Načítám název místa...' };

  getNominatimUrl = (lon, lat) =>
    `http://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1&accept-language=cs`;

  componentWillMount() {
    this.loadName(this.props);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.lon !== this.props.lon || newProps.lat !== this.props.lat) {
      this.loadName(newProps);
    }
  }

  loadName({ lon, lat }) {
    const url = this.getNominatimUrl(lon, lat);
    this.setState({ name: 'Načítám název místa...' });
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const {
          road = false,
          city = false,
          suburb = false
        } = data.address;

        let name = '';
        if (road) {
          name += road;
        }

        if (city) {
          if (name.length > 0) {
            name += ', ';
          }

          name += city;
        }

        if (suburb) {
          if (name.length > 0) {
            name += ' - ';
          }

          name += suburb;
        }

        if (name.length === 0) {
          name = 'Oblast se nepodařilo identifikovat';
        }

        this.setState({ name });
      });
  }

  render() {
    return <span>{this.state.name}</span>;
  }
}

export default PlaceName;


