import React from "react";
import PropTypes from 'prop-types';
import Popup from "reactjs-popup";
import Row from "./Row";

function Usage(props) {
  return (
    <Popup open={props.open} onClose={props.onClose} closeOnDocumentClick modal>
      <div className="content">
        <header>
          <h1>איך לשחק</h1>
          <span className="popup-close-icon" onClick={props.onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </span>
        </header>
        <div className="instructions">
          <p>נחשו את המילה תוך שישה נסיונות</p>
          <p>כל ניחוש חייב להיות מילה בת 5 אותיות</p>
          <p>
            {" "}
            רמזים: פעלים בזמן הווה יחידה או יחיד, שמות עצם ביחיד או יחידה ללא
            סמיכות והטיות שיוך
          </p>
          <p>לאחר כל ניחוש צבע האותיות ישתנה בהתאם</p>
          <div className="examples">
            <div className="example">
              <Row rowword="מעולה" rowdatastates="ctttt" />
              <p>
              <span>האות</span>
              <span><b> מ </b></span>
              <span>במילה במיקום הנכון</span>
              </p>
            </div>
            <div className="example">
              <Row rowword="מתחשב" rowdatastates="tpttt" />
              <p>
              <span>האות</span>
              <span><b> ת </b></span>
              <span>במילה אבל במיקום אחר</span>
              </p>
            </div>
            <div className="example">
              <Row rowword="נעלמת" rowdatastates="tttat" />
              <p>
              <span>האות</span>
              <span><b> מ </b></span>
              <span>אינה נמצאת במילה</span>
              </p>
            </div>
          </div>
          <p className="credit">
            This website was created as an excercise in web development for
            educational purposes.
          </p>
          <p className="credit">
            It is a Hebrew Language adaptaion of the excellent daily word
            puzzle.{" "}
          </p>
          <p className="credit">
            All credit, fame and rights go to the original{" "}
            <strong>WORDLE</strong> creators and lawful owners.
          </p>
        </div>
      </div>
    </Popup>
  );
}

Usage.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
};

export default Usage;
