import { useMemo } from "react";
import "./Component2.css";

const Component2 = ({ camera3, prop, propFlex, propPadding, propMinWidth }) => {
  const divStyle = useMemo(() => {
    return {
      flex: propFlex,
      padding: propPadding,
    };
  }, [propFlex, propPadding]);

  const div1Style = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  return (
    <div className="div152" style={divStyle}>
      <div className="child24" />
      <div className="camera-3-icon">{camera3} </div>
      <div className="div153" style={div1Style}>
        {prop}
      </div>
    </div>
  );
};

export default Component2;
