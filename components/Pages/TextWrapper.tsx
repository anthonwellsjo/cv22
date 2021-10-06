import React, { ReactNode } from 'react';
import { a, useSpring } from '@react-spring/web';
import { getPercentageOfZone } from '../utils/scroll-helpers';


function getMarginBottom(zone: [number, number], scroll: number): string {
  const percentage = getPercentageOfZone(zone, scroll);
  if (percentage === -1) return "0%";
  return `${percentage}%`;
}

function getOpacity(zone: [number, number], scroll: number): number {
  const percentage = getPercentageOfZone(zone, scroll) / 100;
  console.log("percentage", percentage);
  if (percentage === -1) return 0;
  if (percentage > 0.2 && percentage < 0.8) return 1;
  if (percentage <= 0.2) {
    return percentage;
  }
  if (percentage >= 0.8) {
    return 1 - percentage;
  }
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
    <div style={{ width: "100%", top: "30%", }}>
      <a.div style={{ bottom: styles.bottom, position: "relative", marginTop:"10%", height: "80%", width: "100%", opacity: styles.opacity }}>
        {children}
      </a.div>
    </div>
  )
}

export default TextWrapper;




