import React, { Component } from 'react';

class FacebookComments extends Component {

  componentDidMount() {
    if (window.ohYeahIHaveInitFbStuff) {
      return;
    }

    window.fbAsyncInit = () => {
      FB.init({
        appId: '289675434750530',
        cookie: true,
        xfbml: true,
        version: 'v2.7'
      });
    };

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js;
      var fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/cs_CZ/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // this is enough once
    window.ohYeahIHaveInitFbStuff = true;
  }

  componentDidUpdate() {
    if (typeof FB !== 'undefined') {
      FB.XFBML.parse();
    }
  }

  render() {
    return (
      <div style={{ margin: 20 }} className='fb-comments' data-numposts='5' />
    );
  }

}

export default FacebookComments;
