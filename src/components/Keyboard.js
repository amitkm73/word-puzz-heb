import React from "react";
import PropTypes from 'prop-types';
import { nanoid } from "nanoid";

const key_letters = [["פ", "ם", "ן", "ו", "ט", "א", "ר", "ק"],
                    ["ף", "ך", "ל", "ח", "י", "ע", "כ", "ג", "ד", "ש"],
                    ["ץ", "ת", "צ", "מ", "נ", "ה", "ב", "ס", "ז"]];

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

  function getRowButtons(row_num, row_len) {
    var row_buttons = [];
    var i = 0;
    for (i = row_len-1; i >= 0; i--) {
      row_buttons.push(
          <button
            data-state={getDataState(key_letters[row_num][i])}
            onClick={handleClick}
            key={nanoid()}
          >
            {(key_letters[row_num][i])}
          </button>
      );
    }
    return row_buttons;
  }

  var row_1_buttons = getRowButtons(0, 8);
  var row_2_buttons = getRowButtons(1, 10);
  var row_3_buttons = getRowButtons(2, 9);

  return (
    <game-keyboard>
      <div id="keyboard">
        <div className="keyboard-row">
          {row_1_buttons}
          <button data-state="tbd" onClick={() => props.onClick("DEL")}>
            DEL
          </button>
        </div>
        <div className="keyboard-row">
          {row_2_buttons}
        </div>
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
