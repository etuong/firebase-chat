import React from "react";
import Toggle from "react-toggle";
import Popup from "reactjs-popup";
import Slider from "../../node_modules/rc-slider/lib/Slider";

const marks = {
  0: "14px",
  20: "16px",
  40: "18px",
  60: "20px",
  80: "22px",
  100: "24px",
};

function getKeyByValue(value) {
  return Number(Object.keys(marks).find((key) => marks[key] === value));
}

const Preferences = (props) => (
  <Popup
    trigger={
      <button className="btn btn-outline-secondary">
        <i className="fa fa-cogs"></i>
      </button>
    }
    modal
    nested
  >
    {(close) => (
      <div className="popup">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header">Preferences</div>
        <div className="content">
          <div className="preference-item">
            <Toggle
              id="show-participants"
              defaultChecked={props.showPreferences}
              onChange={(_e) => props.setShowPreferences()}
            />
            <label htmlFor="show-participants">Show Participants</label>
          </div>
          <div className="preference-item">
            <Toggle
              id="show-senders"
              defaultChecked={props.showSender}
              onChange={(_e) => props.setShowSender()}
            />
            <label htmlFor="show-senders">Show Senders</label>
          </div>
          <div className="preference-item">
            <p>Font Size</p>
            <Slider
              marks={marks}
              step={10}
              included={false}
              defaultValue={getKeyByValue(props.fontSize)}
              onChange={(e) => props.setFontSize(marks[e])}
            />
          </div>
        </div>
      </div>
    )}
  </Popup>
);

export default Preferences;
