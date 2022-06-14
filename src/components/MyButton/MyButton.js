import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";

export const MyButton = ({variant, size = 'sm', ...props}) => {
  return (<Button variant={variant} size={size} {...props}>My Button</Button>);
}

MyButton.propTypes = {
  /**
   * Sets the color of the button
   */
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'outline-primary', 'outline-secondary', 'outline-success', 'outline-info', 'outline-warning', 'outline-danger']),
  /**
   * Sets the size of the button (sm, md, lg)
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
}
