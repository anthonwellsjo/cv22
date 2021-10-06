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
    <div style={{ height: "100%", width: "90%", maxWidth: "1000px", display: "flex", position: "absolute", justifyContent: "center" }}>
      {isInZone(zone, scroll) && children}
    </div >
  )
}

export default PageWrapper;