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
    <div style={{position:"absolute", top:0, height: "100%", width: "100%", minWidth: "300px",display: "flex", justifyContent: "center", }}>
      {isInZone(zone, scroll) && children}
    </div >
  )
}

export default PageWrapper;