import React from 'react';
import { useSpring, a } from '@react-spring/web';
import { isInZone } from '../utils/scroll-helpers';


interface props {
  zone: [number, number],
  scroll: number,
  children: React.ReactNode
}



const PageWrapper = ({ zone, scroll, children }: props) => {
  return (
    <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", position: "absolute" }}>
      <div style={{ height: "70%", width: "60%", display: "flex", position: "relative" }}>
        {isInZone(zone, scroll) && children}
      </div>
    </div>
  )
}

export default PageWrapper;