import { a, useSpring } from '@react-spring/web';
import React from 'react';
import { isInZone } from './utils/scroll-helpers';

interface props {
  zone: [number, number],
  scroll: number,
}

const IndexHolder: React.FC<props> = ({ children, zone, scroll }) => {
  const styles = useSpring({
    height: isInZone(zone, scroll) ? "45px" : "0px",
    config: {
      mass: 50,
      friction: 100
    }
  })

  return (
    <a.div style={{ position: "absolute", top: "100px", width: "100%", display: "flex", justifyContent: "space-around", backgroundColor: "rgba(256,256,256,0.4)", backdropFilter: "blur(4px)", overflow: "hidden", ...styles }}>
      <div id="indexHolder" style={{ position: "absolute" }}>
        {children}
      </div>
    </a.div>
  )
}

export default IndexHolder;