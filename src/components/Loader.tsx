import React from 'react';
import * as CSS from 'csstype';

const style: CSS.Properties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  verticalAlign: 'middle',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};
const Loader = () => {
  return <div className="loader" style={style}>Loading</div>
}

export default Loader;