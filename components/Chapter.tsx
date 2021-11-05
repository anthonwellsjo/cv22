import React from 'react';
import { useSpring, a } from '@react-spring/web';

interface props {
  children?: React.ReactNode,
  position: number,
  scroll: number,
  title?: string,
  onClickEvent: (position: number) => void
}

function isNear(scroll: number, position: number): boolean {
  if ((Math.abs((scroll / 30 * 100) - position)) < 8) return true;
  return false;
}
function isPassed(scroll: number, position: number): boolean {
  if ((scroll / 30 * 100) - position > -5) return true;
  return false;
}

const Chapter = ({ children, position, scroll, title, onClickEvent }: props) => {
  const style = useSpring({
    backgroundColor: isNear(scroll, position) ? "black" : "lightgrey",
    color: isNear(scroll, position) ? "black" : "lightgrey"
  })

  return (
    <a.div onClick={() => onClickEvent(position)} style={{ position: "absolute", width: "10px", marginTop: "20px", height: "10px", borderRadius: "10px", backgroundColor: !title ? style.backgroundColor : "transparent", left: `${position}%`, cursor: "pointer", display: "flex", alignItems: "center" }}>
      <a.div style={{ color: style.color, width: "100%", display: "flex", justifyContent: "center", position: "absolute", textAlign: "center", userSelect: "none" }}>
        {title && <a.h4 className="navbarTitle">{title}</a.h4>}
      </a.div>
      {children}
    </a.div>

  )
}

export default Chapter;


