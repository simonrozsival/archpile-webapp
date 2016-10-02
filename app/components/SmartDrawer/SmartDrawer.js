import React, { PropTypes, Component } from 'react';
import Dimensions from 'react-dimensions';
import Drawer from 'material-ui/Drawer';

const getWidth = (availableWidth, maxWidth) =>
  Math.min(availableWidth, maxWidth);

class SmartDrawer extends Component {

  render() {
    const {
      containerWidth,
      maxWidth,
      children,
      ...props
    } = this.props;

    return (
      <Drawer open={!!children} width={getWidth(containerWidth, maxWidth)} {...props}>
        {children}
      </Drawer>
    );
  }

}

export default Dimensions()(SmartDrawer);
