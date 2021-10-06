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
    scale: isNear(scroll, position) ? 2 : 1,
    backgroundColor: isPassed(scroll, position) ? "red" : "black"
  })

  return (
    <a.div onClick={() => onClickEvent(position)} style={{ position: "absolute", width: "10px", height: "10px", borderRadius: "10px", backgroundColor: style.backgroundColor, left: `${position}%`, scale: style.scale, top: "-20px", cursor: "pointer" }}>
      <a.div style={{ width: "100%", display: "flex", justifyContent: "center", top: "-50px", position: "absolute", textAlign: "center", userSelect: "none" }}>
        {title && <a.h4>{title}</a.h4>}
      </a.div>
      {children}
    </a.div>

  )
}

export default Chapter;


