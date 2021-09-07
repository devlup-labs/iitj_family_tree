import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import 'tippy.js/animations/shift-away.css';

function Help() {
  const [visible, setVisible] = React.useState(false);
  const toggle = () => setVisible(!visible);
  const Instructions = () => {
  return (
    <div className="tooltiptext">
      <p>Instructions</p>
      <div style={{textAlign:"center"}} >
        <ol style={{textAlign:"left"}}>
          <li>Right-click </li>
          <li>Left-click </li>
          <li>Zoom</li>
          <li>Drag</li>
          <li>Search</li>
        </ol>
      </div>
    </div>
    );
  };

  return (
    <Tippy
      className="tooltip"
      placement="bottom"
      content={<Instructions />}
      visible={visible}
      interactive={true}
      arrow={false}
      animation="shift-away"
    >
      <button onClick={toggle} className="helpbutton">
        ?
      </button>
    </Tippy>
  );
}

export default Help;
