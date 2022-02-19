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
            x
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
