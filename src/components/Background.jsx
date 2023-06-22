import { useDrop } from "react-dnd";

function Background(props) {
  const [, drop] = useDrop(() => ({
    accept: "draggableCal",
    drop(item, monitor) {
      const top = monitor.getDifferenceFromInitialOffset().y;
      const left = monitor.getDifferenceFromInitialOffset().x;
      return { top, left };
    },
  }));

  return (
    <div className="background" ref={drop}>
      {props.children}
    </div>
  );
}
export default Background;
