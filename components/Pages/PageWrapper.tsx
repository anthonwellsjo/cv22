import React, { useEffect, useState } from 'react';
import { useSpring, a } from '@react-spring/web';
import { isInZone } from '../utils/scroll-helpers';


interface props {
  zone: [number, number],
  scroll: number,
  children: React.ReactNode,
  marginTop?: string,
}



const PageWrapper = ({ zone, scroll, children, marginTop = "auto" }: props) => {
  

  return (
    <div style={{ marginTop: marginTop, position: "absolute", top: 0, height: "100%", width: "100%", minWidth: "300px", display: "flex", justifyContent: "center", }}>
      {isInZone(zone, scroll) && children}
    </div >
  )
}

export default PageWrapper;