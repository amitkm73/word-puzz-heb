import React from "react";
import Popup from "reactjs-popup";

function InvalidWord(props) {
  function handleClose() {
    props.onClose();
  }

  return (
    <Popup open={props.open} onClose={handleClose} closeOnDocumentClick modal>
      <div className="modal">
        <div className="invalidword">
          <p>הניחוש צריך להיות מילה בת 5 אותיות</p>
        </div>
      </div>
    </Popup>
  );
}

export default InvalidWord;
