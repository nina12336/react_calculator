import { useState } from "react";
import { useDrop } from "react-dnd";

function Background(props) {
  // const [offsetX, setOffsetX] = useState(0);
  // const [offsetY, setOffsetY] = useState(0);
  const [, drop] = useDrop(() => ({
    accept: "dragablecal",
    drop(item, monitor) {
      const top = monitor.getDifferenceFromInitialOffset().y;
      const left = monitor.getDifferenceFromInitialOffset().x;
      return { top, left };
    },
  }));

  return (
    <div className="background2" ref={drop}>
      {props.children}
    </div>
  );
}
export default Background;
