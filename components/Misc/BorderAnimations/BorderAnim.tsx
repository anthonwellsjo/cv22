import { a, useSprings } from '@react-spring/web';
import React, { useEffect, useMemo, useState } from 'react';
import { getAnimPlates, Plate } from '../../utils/plates';
import { getPercentageOfZone, getScrollPercentage, isInZone } from '../../utils/scroll-helpers';

interface props {
  zone: [number, number],
  scroll: number,
  children: React.ReactNode
}

const BorderAnim: React.FC<props> = ({ children, zone, scroll }) => {
  const [plates, setPlates] = useState<{ top: Plate[], right: Plate[], bottom: Plate[], left: Plate[] }>({ top: [], right: [], bottom: [], left: [] });

  useEffect(() => {
    setPlates({ top: getAnimPlates(20), right: getAnimPlates(10, 21), bottom: getAnimPlates(20, 32), left: getAnimPlates(10, 53) });
  }, [])

  const getTotalNoOfPlates = () => {
    return plates.bottom.length + plates.right.length + plates.top.length + plates.left.length;
  }

  const getRandomPosition = (axel: "x" | "y") => {
    if (axel === "x") {
      switch (Math.floor(Math.random() * 2)) {
        case 0: return (Math.random() * 400).toString();
        case 1: return -(Math.random() * 400).toString();
        default: return (Math.random() * 400).toString();
      }
    }
    if (axel === "y") {
      switch (Math.floor(Math.random() * 2)) {
        case 0: return (Math.random() * 400).toString();
        case 1: return -(Math.random() * 400).toString();
        default: return (Math.random() * 400).toString();
      }
    }

  }

  const getRandomRotation = () => {
    switch (Math.floor(Math.random() * 2)) {
      case 0: return (Math.random() * 300).toString();
      case 1: return -(Math.random() * 300).toString();
      default: return (Math.random() * 300).toString();
    }
  }

  const thePlateMoveShouldIt = (order: number) => {
    const totPlates = getTotalNoOfPlates();
    const orderPercentage = order / totPlates * 100;
    const scrollPerc = getPercentageOfZone(zone, scroll);
    // console.log("percentages", orderPercentage, scrollPerc, orderPercentage - scrollPerc);
    if (Math.abs(orderPercentage - scrollPerc) < 1) return true;
    return false;
  }

  const thePlateIsVisibileIsIt = (order: number) => {
    const totPlates = getTotalNoOfPlates();
    const orderPercentage = order / totPlates * 100;
    const scrollPerc = getPercentageOfZone(zone, scroll);
    // console.log("percentages", orderPercentage, scrollPerc, orderPercentage - scrollPerc);
    if ((scrollPerc - orderPercentage) > -.5) return true;
    return false;
  }

  const TopSprings = useSprings(
    plates.top.length,
    plates.top.map(plate => (
      {
        transform: thePlateIsVisibileIsIt(plate.order) ? `rotate(${(plate.order / 10).toString()}deg) translateX(0px) translateY(0px)` : `rotate(${getRandomRotation()}deg) translateX(${getRandomPosition("x")}px) translateY(${getRandomPosition("y")}px)`,
        opacity: thePlateIsVisibileIsIt(plate.order) ? 1 : 0,
        config: {
          mass: 45,
          friction: 150,
          tension:200
          
        }
      }
    )
    )
  )
  const RightSprings = useSprings(
    plates.right.length,
    plates.right.map(plate => (
      {
        transform: thePlateIsVisibileIsIt(plate.order) ? `rotate(${(plate.order / 10).toString()}deg) translateX(0px) translateY(0px)` : `rotate(${getRandomRotation()}deg) translateX(${getRandomPosition("x")}px) translateY(${getRandomPosition("y")}px)`,
        opacity: thePlateIsVisibileIsIt(plate.order) ? 1 : 0,
        config: {
          mass: 45,
          friction: 150,
          tension:200
        }
      }
    )
    )
  )
  const BottomSprings = useSprings(
    plates.bottom.length,
    plates.bottom.map(plate => (
      {
        transform: thePlateIsVisibileIsIt(plate.order) ? `rotate(${(plate.order / 10).toString()}deg) translateX(0px) translateY(0px)` : `rotate(${getRandomRotation()}deg) translateX(${getRandomPosition("x")}px) translateY(${getRandomPosition("y")}px)`,
        opacity: thePlateIsVisibileIsIt(plate.order) ? 1 : 0,
        config: {
          mass: 45,
          friction: 150,
          tension:200
        }
      }
    )
    )
  )
  const LeftSprings = useSprings(
    plates.left.length,
    plates.left.map(plate => (
      {
        transform: thePlateIsVisibileIsIt(plate.order) ? `rotate(${(plate.order / 10).toString()}deg) translateX(0px) translateY(0px)` : `rotate(${getRandomRotation()}deg) translateX(${getRandomPosition("x")}px) translateY(${getRandomPosition("y")}px)`,
        opacity: thePlateIsVisibileIsIt(plate.order) ? 1 : 0,
        config: {
          mass: 45,
          friction: 150,
          tension:200
        }
      }
    )
    )
  )

  return (
    <div style={{ width: "80%", position: "absolute", top: "40%", padding: "5%" }}>
      <div style={{ left: 0, top: 0, width: "100%", position: "absolute", display: "flex", justifyContent: "space-evenly" }}>
        {TopSprings.map((styles) => {
          return (
            <a.div key={styles.transform.id} style={{ transformOrigin: "center", height: "2px", width: "2vw", backgroundColor: "black", ...styles }} />
          )
        })}
      </div>
      <div style={{ top: 0, right: 0, height: "100%", position: "absolute", display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
        {RightSprings.map((styles) => {
          return (
            <a.div key={styles.transform.id} style={{ transformOrigin: "center", height: "2vw", width: "2px", backgroundColor: "black", ...styles }} />
          )
        })}
      </div>
      <div style={{ left: 0, bottom: 0, width: "100%", position: "absolute", display: "flex", flexDirection: "row-reverse", justifyContent: "space-evenly" }}>
        {BottomSprings.map((styles) => {
          return (
            <a.div key={styles.transform.id} style={{ transformOrigin: "center", width: "2vw", height: "2px", backgroundColor: "black", ...styles }} />
          )
        })}
      </div>
      <div style={{ top: 0, left: 0, height: "100%", position: "absolute", display: "flex", flexDirection: "column-reverse", justifyContent: "space-evenly" }}>
        {LeftSprings.map((styles) => {
          return (
            <a.div key={styles.transform.id} style={{ transformOrigin: "center", height: "2vw", width: "2px", backgroundColor: "black", ...styles }} />
          )
        })}
      </div>
      {children}
    </div>
  )
}

export default BorderAnim;