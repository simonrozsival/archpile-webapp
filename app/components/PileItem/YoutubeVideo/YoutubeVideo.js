import React, { PropTypes, Component } from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { facebookProfileUrl } from '../../FacebookProfile';

class YoutubeVideo extends Component {

  state = {};

  componentWillMount() {
    const { id } = this.props;
    const metadatUrl = `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=snippet&key=AIzaSyCXCTCNFNY5Dh_MhvAg1cDsMLyYLh1Jgec`;
    fetch(metadatUrl)
      .then(res => res.json())
      .then(metadata => {
        if (metadata.items.length > 0) {
          const item = metadata.items[0].snippet;
          this.setState({
            metadata: {
              thumbnailUrl: item.thumbnails.default.url,
              title: item.title,
              description: item.description,
              authorName: item.channelTitle
            }
          });
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.metadata) {
      // loading...
      return null;
    }

    const {
      thumbnailUrl,
      title,
      authorName
    } = this.state.metadata;

    return (
      <ListItem
        primaryText={title}
        secondaryText={authorName}
        leftAvatar={<Avatar src={thumbnailUrl} />}
        rightAvatar={<Avatar src={facebookProfileUrl(this.props.author.fbid)} />} />
    );
  }

}

export default YoutubeVideo;
