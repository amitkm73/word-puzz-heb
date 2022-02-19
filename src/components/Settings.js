import React, { useState } from "react";
import PropTypes from 'prop-types';
import Popup from "reactjs-popup";

function Settings(props) {
  function handleSettings(e) {
    switch (e.target.id) {
      case "nightmode":
        document.body.classList.toggle("nightmode", e.target.checked);
        setNightMode(e.target.checked);
        break;
      case "highcontrast":
        document.body.classList.toggle("colorblind", e.target.checked);
        setHighContrast(e.target.checked);
        break;
      case "hardmode":
        break;
      default:
        console.log("unexpected setting");
    }
  }

  const [nightMode, setNightMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  return (
    <Popup
      position="top center"
      open={props.open}
      onClose={props.onClose}
      closeOnDocumentClick
      modal
    >
      <div className="content">
        <header>
          <h1>הגדרות</h1>
          <span className="popup-close-icon" onClick={props.onClose}>
            x
          </span>
        </header>
        <div className="setting">
          <div className="text">
            <div className="title">תצוגת לילה</div>
            <div className="description">רקע כהה וטקסט בהיר</div>
          </div>
          <div className="control">
            <label className="switch">
              <input
                type="checkbox"
                onChange={handleSettings}
                id="nightmode"
                checked={nightMode}
              ></input>
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <div className="setting">
          <div className="text">
            <div className="title">ניגודיות צבעים גבוהה</div>
            <div className="description">שימוש בצבעים בולטים במיוחד</div>
          </div>
          <div className="control">
            <label className="switch">
              <input
                type="checkbox"
                onChange={handleSettings}
                id="highcontrast"
                checked={highContrast}
              ></input>
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <div className="setting">
          <div className="text">
            <div className="title">רמת משחק קשה</div>
            <div className="description">אפשרות זאת איננה מוגדרת עדיין</div>
          </div>
          <div className="control">
            <label className="switch">
              <input
                type="checkbox"
                onChange={handleSettings}
                id="hardmode"
              ></input>
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <div className="setting">
          <div className="text">
            <div className="title">יצירת קשר</div>
            <div className="description">נשמח לשמוע רעיונות לשיפור</div>
          </div>
          <div className="control">
            <a
              href="mailto:wordpuzzheb@gmail.com?subject=feedback"
              title="word-puzzle-hebrew"
            >
              Email
            </a>
            |
            <a
              href="https://twitter.com/intent/tweet?screen_name=wordpuzzheb"
              target="blank"
              title="@wordpuzzheb"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </Popup>
  );
}

Settings.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
};

export default Settings;
