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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
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
