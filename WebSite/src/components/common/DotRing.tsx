import { PinDrop } from "@mui/icons-material";
import useMousePosition from "../../hooks/useMousePosition";

const DotRing = () => {
  const { x, y } = useMousePosition();
  const newX = (x ?? 0) - 12
  const newY = (y ?? 0) - 24

  return (
    <PinDrop style={{position: "fixed", left: `${newX}px`, top: `${newY}px`, zIndex: 999, margin: 0, padding: 0 }} />
  );
};

export default DotRing;