import React from "react";
import PropTypes from 'prop-types';

function UserMsg(props) {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        {props.content}
      </div>
    </div>
  );
}

UserMsg.propTypes = {
    handleClose: PropTypes.func,
    content: PropTypes.node
};

export default UserMsg;
