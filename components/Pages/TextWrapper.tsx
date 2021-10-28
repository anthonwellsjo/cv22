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
  children: ReactNode
}

const TextWrapper: React.FC<props> = ({ children, zone, scroll }: props) => {


  const styles = useSpring({
    bottom: getMarginBottom(zone, scroll),
    opacity: getOpacity(zone, scroll)
  })


  return (

    <div style={{ position: "relative", width: "100%", height: "50%", display: "flex", justifyContent: "center", marginTop: "45%", }}>
      <a.div style={{ bottom: styles.bottom, position: "absolute", height: "80%", width: "100%", opacity: styles.opacity, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(256,256,256,0.5)", backdropFilter: "blur(20px)", borderTop:"3px solid black", borderBottom:"3px solid black" }}>
        {children}
      </a.div>
    </div>

  )
}

export default TextWrapper;




