import { useMemo } from "react";
import "./DropdownFrame.css";

const DropdownFrame = ({ prop, prop1, prop2, propPadding }) => {
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
              <input className="footer-container2" type="checkbox" />
              <input className="container-with-logo" type="checkbox" />
              <input className="payment-icons-container" type="checkbox" />
            </div>
            <div className="div78">
              <p className="p14">Шкіра</p>
              <p className="p15">{prop1}</p>
              <p className="p16">{prop2}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownFrame;
