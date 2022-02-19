import React from "react";
import PropTypes from 'prop-types';

function Tile(props) {
  return (
    <div className="tile" data-state={props.dataState}>
      {props.letter}
    </div>
  );
}

Tile.propTypes = {
  dataState: PropTypes.string,
  letter: PropTypes.string
};

export default Tile;
