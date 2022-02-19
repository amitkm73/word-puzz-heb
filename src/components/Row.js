import React from "react";
import PropTypes from 'prop-types';
import { nanoid } from "nanoid";
import Tile from "./Tile";

function Row(props) {
  var tileList = [];
  var dataState = "";
  for (var i = 0; i <= 4; i++) {
    switch (props.rowdatastates[i]) {
      case "c":
        dataState = "correct";
        break;
      case "p":
        dataState = "present";
        break;
      case "a":
        dataState = "absent";
        break;
      case "e":
        dataState = "empty";
        break;
      case "t":
        dataState = "tbd";
        break;
      default:
        console.log("unexpected row data state");
        break;
    }
    tileList.push(
      <Tile letter={props.rowword[i]} dataState={dataState} key={nanoid()} />
    );
  }
  return (
    <div
      className="row"
      rowword={props.rowword}
      rowdatastates={props.rowdatastates}
    >
      {tileList}
    </div>
  );
}

Row.propTypes = {
    rowdatastates: PropTypes.string,
    rowword: PropTypes.string
};

export default Row;
