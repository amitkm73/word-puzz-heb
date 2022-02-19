import React from "react";
import PropTypes from 'prop-types';
import UserMsg from "./UserMsg";

function Stats(props) {
  function getWinRate() {
    var winRate = 0.0;
    if (props.userNumPlayed > 0) {
      for (var i = 0; i < 6; i++) {
        winRate += props.userWins[i];
      }
      winRate = winRate / props.userNumPlayed;
    }
    winRate = parseFloat(winRate * 100).toFixed(0) + "%";
    return winRate;
  }

  const winRate = getWinRate();
  return (
    <UserMsg
      content={
        <>
          <p>
            <b>{props.msgText}</b>
          </p>
          <div className="stats">
            <table>
              <tbody>
                <tr>
                  <td colSpan="2">
                    <b> סטטיסטיקה </b>
                  </td>
                </tr>
                <tr>
                  <td>{props.userNumPlayed}</td>
                  <td>משחקים</td>
                </tr>
                <tr>
                  <td>{winRate}</td>
                  <td>%נצחונות</td>
                </tr>
                <tr>
                  <td>{props.userCurrentStreak}</td>
                  <td>רצף נוכחי</td>
                </tr>
                <tr>
                  <td>{props.userMaxStreak}</td>
                  <td>רצף מקסימלי</td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td colSpan="2">
                    <b>התפלגות תוצאות</b>
                  </td>
                </tr>
                <tr>
                  <td>נצחונות</td>
                  <td>ניחושים</td>
                </tr>
                <tr>
                  <td>{props.userWins[0]}</td>
                  <td><b>1</b></td>
                </tr>
                <tr>
                  <td>{props.userWins[1]}</td>
                  <td><b>2</b></td>
                </tr>
                <tr>
                  <td>{props.userWins[2]}</td>
                  <td><b>3</b></td>
                </tr>
                <tr>
                  <td>{props.userWins[3]}</td>
                  <td><b>4</b></td>
                </tr>
                <tr>
                  <td>{props.userWins[4]}</td>
                  <td><b>5</b></td>
                </tr>
                <tr>
                  <td>{props.userWins[5]}</td>
                  <td><b>6</b></td>
                </tr>
              </tbody>
            </table>
          </div>
          <button className="share" onClick={props.onShare}>
            שיתוף
          </button>
        </>
      }
      handleClose={props.onClose}
    />
  );
}

Stats.propTypes = {
  msgText: PropTypes.string,
  userNumPlayed: PropTypes.number,
  userCurrentStreak: PropTypes.number,
  userMaxStreak: PropTypes.number,
  userWins: PropTypes.array,
  onShare: PropTypes.func,
  onClose: PropTypes.func
};

export default Stats;
