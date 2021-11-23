import React, { ReactNode } from 'react';
import { a, useSpring } from '@react-spring/web';
import { getPercentageOfZone } from '../utils/scroll-helpers';


function getMarginBottom(zone: [number, number], scroll: number): string {
  const percentage = getPercentageOfZone(zone, scroll);
  if (percentage === -1) return "0%";
  return `${percentage + 5}%`;
}

function getOpacity(zone: [number, number], scroll: number): number {
  const percentage = getPercentageOfZone(zone, scroll) / 100;
  if (percentage === -1) return 0;
  if (percentage > 0.1 && percentage < 0.8) return 1;
  if (percentage <= 0.1) {
    return percentage;
  }
  if (percentage >= 0.8) {
    return 1 - percentage;
  }
  return 1;
}



interface props {
  zone: [number, number],
  scroll: number,
  children: ReactNode,
  divHeight?: string
}

const Scroller: React.FC<props> = ({ children, zone, scroll, divHeight }: props) => {


  const styles = useSpring({
    bottom: getMarginBottom(zone, scroll),
    opacity: getOpacity(zone, scroll)
  })


  return (

    <div style={{ position: "relative", top: "150px", width: "100%", height: divHeight, display: "flex", justifyContent: "center", overflow: "hidden" }}>
      <a.div style={{ bottom: styles.bottom, position: "absolute", width: "100%", height: divHeight, opacity: styles.opacity, display: "flex", justifyContent: "center", alignItems: "center", }}>
        {children}
      </a.div>
    </div>

  )
}

export default Scroller;




