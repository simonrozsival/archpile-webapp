import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import getYoutubeId from 'get-youtube-id';
import validUri from 'valid-url';

class AddPostForm extends Component {

  state = { url: '', name: '', category: 'Vize' };

  changeUrl = (url) => {
    if (!validUri.isUri(url)) {
      this.setState({ url, urlError: 'URL není validní' });
    } else {
      this.setState({ url, urlError: null });
    }
  };

  changetitle = (title) => {
    if (title.length === 0) {
      this.setState({ title, titleError: 'Prosím vyplňte jméno' });
    } else {
      this.setState({ title, titleError: null });
    }
  };

  changeCategory = (category) => {
    this.setState({ category });
  };

  getType = (url) => {
    if (url.indexOf('youtube.com') !== -1) {
      return 'youtube';
    }

    return 'article';
  };

  getData = (type, url) => {
    switch (type) {
      case 'youtube':
        return {
          id: getYoutubeId(url)
        };
      case 'article':
        return { url };
      default:
        throw new Error(`Unsupported type '${type}'`);
    }
  };

  add(e) {
    e.preventDefault();
    const { add } = this.props;
    const { url, title, category } = this.state;
    const type = this.getType(url);
    add(category, title, type, this.getData(type, url));
    this.setState({ title: '', url: '', category: 'Vize', urlError: null, titleError: null });
  }

  render() {
    const { url, urlError, title, titleError, category } = this.state;

    return (
      <form>
        <div>
          <SelectField fullWidth value={category} onChange={e => this.changeCategory(e.target.value)}>
            <MenuItem value={'Reálný stav'} primaryText='Reálný stav' />
            <MenuItem value={'Vize'} primaryText='Vize' />
          </SelectField>
        </div>
        <div>
          <TextField
            fullWidth
            hintText='Název'
            errorText={titleError}
            value={title}
            onChange={e => this.changetitle(e.target.value)} />
        </div>
        <div>
          <TextField
            fullWidth
            hintText='URL zdroje'
            errorText={urlError}
            value={url}
            onChange={e => this.changeUrl(e.target.value)} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <RaisedButton
            type='submit'
            label='Přidat'
            primary
            disabled={urlError !== null || titleError !== null}
            onClick={e => this.add(e)} />
        </div>
      </form>
    );
  }

}

export default AddPostForm;
