import React from 'react';
import { useSpring, a } from '@react-spring/web';
import { getScrollPercentage } from './utils/scroll-helpers';
import { thresHolds } from './utils/app-config';


interface props {
  scroll: number
}

const ScrollBar = ({ scroll }: props) => {

  const getTop = (scroll: number) => {

    const percentage = getScrollPercentage(scroll);

    return `${percentage}%`;
  }

  const styles = useSpring({
    width: getTop(scroll),

  })

  return (
    <a.div style={{
      // 
      left: 0,
      width: styles.width,
      height: "5px",
      boxShadow: "1px 1px 20px black",
      backgroundColor: "black",
      position: "absolute",
      bottom: "0px"
    }} />
  )
}

export default ScrollBar;