import React from 'react';
import { useSpring, a } from '@react-spring/web';
import { getScrollPercentage } from './utils/scroll-helpers';


interface props {
  scroll: number
}

const ScrollBar = ({ scroll }: props) => {

  const getTop = (scroll: number) => {

    const percentage = getScrollPercentage(scroll);
    if (percentage < 5) return "5%";
    if (percentage > 95) return "95%"
    else return `${percentage}%`;
  }

  const styles = useSpring({
    right: getTop(scroll)
  })

  return (
    <a.div style={{
      left: "0",
      width: styles.right,
      borderRadius: "2px",
      height: "2px",
      backgroundColor: "black",
      position: "absolute",
      bottom: "13px"
    }} />
  )
}

export default ScrollBar;