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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-backspace" viewBox="0 0 16 16">
              <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>
              <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z"/>
            </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
            </svg>
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
