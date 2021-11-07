import React from 'react';
import { useSpring, a } from '@react-spring/web';
import GetMediaPort from './Misc/GetMediaPort';
import { MediaPort } from '../enums';
import { useViewport } from './Misc/ViewPort';
import { maxScroll } from './utils/app-config';

interface props {
  children?: React.ReactNode,
  position: number,
  scroll: number,
  title?: string,
  onClickEvent: (position: number) => void
}

function isNear(scroll: number, position: number): boolean {
  console.log("is near", Math.abs((scroll / maxScroll * 100) - position));
  if ((scroll / maxScroll * 100) - position > -5 && Math.abs((scroll / maxScroll * 100) - position) < 15 ) return true;
  return false;
}
function isPassed(scroll: number, position: number): boolean {
  if ((scroll / 30 * 100) - position > -5) return true;
  return false;
}

const Chapter = ({ children, position, scroll, title, onClickEvent }: props) => {
  const { width, height } = useViewport();

  const style = useSpring({
    backgroundColor: isNear(scroll, position) ? "black" : "lightgrey",
    color: isNear(scroll, position) ? "black" : "lightgrey"
  })

  const getMarginTop = () => {
    if (GetMediaPort({ height, width }) === MediaPort.mobile) return "10px";
    return "20px";
  }

  return (
    <a.div onClick={() => onClickEvent(position-6)} style={{ position: "absolute", width: "10px", marginTop: getMarginTop(), height: "10px", borderRadius: "10px", backgroundColor: !title ? style.backgroundColor : "transparent", left: `${position}%`, cursor: "pointer", display: "flex", alignItems: "center" }}>
      <a.div style={{ color: style.color, width: "100%", display: "flex", justifyContent: "center", position: "absolute", textAlign: "center", userSelect: "none" }}>
        {title && < a.h4 className="navbarTitle">{title}</a.h4>}
      </a.div>
      {children}
    </a.div >

  )
}

export default Chapter;


