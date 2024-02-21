import { useMemo } from "react";
import "./DropdownFrame.css";

const DropdownFrame = ({ prop, items, propPadding }) => {
  const logoFrameStyle = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  return (
    <div className="dropdown-frame2">
      <div className="text-input-frame" />
      <div className="image-container">
        <div className="div77">{prop}</div>
        <div className="logo-frame2" style={logoFrameStyle}>
          <div className="frame-with-icons">
            <div className="frame-with-reviews">

            {
              items.map((x)=>(<input className="footer-container2" type="checkbox" />))
            }
              
            </div>
            <div className="div78">
            {
              items.map((x)=>( <p className="p14">{x.name}</p>))
            }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownFrame;
