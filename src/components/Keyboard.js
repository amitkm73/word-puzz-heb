import React from "react";
import PropTypes from 'prop-types';
import { nanoid } from "nanoid";

const row_1_letters = ["פ", "ם", "ן", "ו", "ט", "א", "ר", "ק"];
const row_2_letters = ["ף", "ך", "ל", "ח", "י", "ע", "כ", "ג", "ד", "ש"];
const row_3_letters = ["ץ", "ת", "צ", "מ", "נ", "ה", "ב", "ס", "ז"];

function Keyboard(props) {
  function handleClick(e) {
    props.onClick(e.target.textContent);
  }

  function getDataState(letter) {
    var dataState = "tbd";
    for (var i = 0; i < 30; i++) {
      if (props.tileData[i].letter === letter) {
        if (props.tileData[i].dataState === "correct") {
          dataState = "correct";
          break;
        } else if (props.tileData[i].dataState === "present") {
          dataState = "present";
        } else if (
          props.tileData[i].dataState === "absent" &&
          dataState !== "present")
        {
          dataState = "absent";
        }
      }
    }
    return dataState;
  }

  var row_1_buttons = [];
  var i = 0;
  for (i = 7; i >= 0; i--) {
    row_1_buttons.push(
      <button
        data-state={getDataState(row_1_letters[i])}
        onClick={handleClick}
        key={nanoid()}
      >
        {row_1_letters[i]}
      </button>
    );
  }
  var row_2_buttons = [];
  for (i = 9; i >= 0; i--) {
    row_2_buttons.push(
      <button
        data-state={getDataState(row_2_letters[i])}
        onClick={handleClick}
        key={nanoid()}
      >
        {row_2_letters[i]}
      </button>
    );
  }
  var row_3_buttons = [];
  for (i = 8; i >= 0; i--) {
    row_3_buttons.push(
      <button
        data-state={getDataState(row_3_letters[i])}
        onClick={handleClick}
        key={nanoid()}
      >
        {row_3_letters[i]}
      </button>
    );
  }

  return (
    <game-keyboard>
      <div id="keyboard">
        <div className="keyboard-row">
          {row_1_buttons}
          <button data-state="tbd" onClick={() => props.onClick("DEL")}>
            DEL
          </button>
          </div>
        <div className="keyboard-row">{row_2_buttons}</div>
        <div className="keyboard-row">
          <button
            data-state="tbd"
            className="one-and-a-half"
            onClick={() => props.onClick("ENTER")}
          >
            ENT
          </button>
          {row_3_buttons}
        </div>
      </div>
    </game-keyboard>
  );
}

Keyboard.propTypes = {
  onClick: PropTypes.func,
  tileData: PropTypes.array
};

export default Keyboard;
