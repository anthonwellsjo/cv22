import { a, useSpring } from '@react-spring/web';
import React, { useEffect } from 'react';
import { MediaPort } from '../enums';
import GetMediaPort from './Misc/GetMediaPort';

import { useViewport } from './Misc/ViewPort';
import { mediaThresHolds } from './utils/app-config';
import { isInZone } from './utils/scroll-helpers';

interface props {
  zone: [number, number],
  scroll: number,
}

const IndexHolder: React.FC<props> = ({ children, zone, scroll }) => {
  const { width, height } = useViewport();

  const getHeightOpen = () => {
    if (GetMediaPort({ width, height }) === MediaPort.mobile) return "27px";
    return "45px";
  }
  const getHeightClosed = () => {

    return "0px";
  }
  const styles = useSpring({
    height: isInZone(zone, scroll) ? getHeightOpen() : getHeightClosed(),
    config: {
      mass: 50,
      friction: 100
    }
  })

  const getTopDistance = () => {
    if (GetMediaPort({ width, height }) === MediaPort.desktop) return "100px";
    if (GetMediaPort({ width, height }) === MediaPort.mobile) return "0";


    return "100px";
  }

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <a.div style={{ position: "absolute", zIndex: 2, width: "100%", display: "flex", justifyContent: "center", backgroundColor: "rgba(256,256,256,0.7)", backdropFilter: "blur(4px)", overflow: "hidden", ...styles }}>
        <div style={{ width: "100%", maxWidth: "700px", display: "flex", justifyContent: "space-around", }}>
          {children}
        </div>
      </a.div>
    </div>
  )
}

export default IndexHolder;