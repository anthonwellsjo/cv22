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
    setPlates({ top: getAnimPlates(40), right: getAnimPlates(20, 41), bottom: getAnimPlates(40, 62), left: getAnimPlates(20, 103) });
  }, [])

  const getTotalNoOfPlates = () => {
    return plates.bottom.length + plates.right.length + plates.top.length + plates.left.length;
  }

  const thePlateMoveShouldIt = (order: number) => {
    const totPlates = getTotalNoOfPlates();
    const orderPercentage = order / totPlates * 100;
    const scrollPerc = getPercentageOfZone(zone, scroll);
    // console.log("percentages", orderPercentage, scrollPerc, orderPercentage - scrollPerc);
    if (Math.abs(orderPercentage - scrollPerc) < 2) return true;
    return false;
  }

  const thePlateIsVisibileIsIt = (order: number) => {
    const totPlates = getTotalNoOfPlates();
    const orderPercentage = order / totPlates * 100;
    const scrollPerc = getPercentageOfZone(zone, scroll);
    // console.log("percentages", orderPercentage, scrollPerc, orderPercentage - scrollPerc);
    if ((scrollPerc - orderPercentage) > 0) return true;
    return false;
  }

  const TopSprings = useSprings(
    plates.top.length,
    plates.top.map(plate => (
      {
        transform: `rotate(${thePlateMoveShouldIt(plate.order) ? plate.order * getPercentageOfZone(zone, scroll) / 2 : "0"}deg)`,
        opacity: thePlateIsVisibileIsIt(plate.order) ? 1 : 0
      }
    )
    )
  )
  const RightSprings = useSprings(
    plates.right.length,
    plates.right.map(plate => (
      {
        transform: `rotate(${thePlateMoveShouldIt(plate.order) ? plate.order * getPercentageOfZone(zone, scroll) / 2 : "0"}deg)`,
        opacity: thePlateIsVisibileIsIt(plate.order) ? 1 : 0
      }
    )
    )
  )
  const BottomSprings = useSprings(
    plates.bottom.length,
    plates.bottom.map(plate => (
      {
        transform: `rotate(${thePlateMoveShouldIt(plate.order) ? plate.order * getPercentageOfZone(zone, scroll) / 2 : "0"}deg)`,
        opacity: thePlateIsVisibileIsIt(plate.order) ? 1 : 0
      }
    )
    )
  )
  const LeftSprings = useSprings(
    plates.left.length,
    plates.left.map(plate => (
      {
        transform: `rotate(${thePlateMoveShouldIt(plate.order) ? plate.order * getPercentageOfZone(zone, scroll) / 2 : "0"}deg)`,
        opacity: thePlateIsVisibileIsIt(plate.order) ? 1 : 0
      }
    )
    )
  )

  return (
    <div style={{ width: "80%", position: "absolute", top: "40%", padding: "5%" }}>
      <div style={{ left: 0, top: 0, width: "100%", position: "absolute", display: "flex", justifyContent: "space-evenly" }}>
        {TopSprings.map((styles) => {
          return (
            <a.div key={styles.transform.id} style={{ width: "1vw", height: "1px", backgroundColor: "black", ...styles }} />
          )
        })}
        {/* {platesTop.map((p, i) => {
          // <h1>hej</h1>
          return (<a.div key={p.id} style={{ width: "1vw", height: "1px", backgroundColor: "black", transform: `rotate(${styles.rotation(p.order)}deg)` }} />)
        })} */}
      </div>
      <div style={{ top: 0, right: 0, height: "100%", position: "absolute", display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
        {RightSprings.map((styles) => {
          return (
            <a.div key={styles.transform.id} style={{ height: "1vw", width: "1px", backgroundColor: "black", ...styles }} />
          )
        })}
      </div>
      <div style={{ left: 0, bottom: 0, width: "100%", position: "absolute", display: "flex", flexDirection: "row-reverse", justifyContent: "space-evenly" }}>
        {BottomSprings.map((styles) => {
          return (
            <a.div key={styles.transform.id} style={{ width: "1vw", height: "1px", backgroundColor: "black", ...styles }} />
          )
        })}
      </div>
      <div style={{ top: 0, left: 0, height: "100%", position: "absolute", display: "flex", flexDirection: "column-reverse", justifyContent: "space-evenly" }}>
        {LeftSprings.map((styles) => {
          return (
            <a.div key={styles.transform.id} style={{ height: "1vw", width: "1px", backgroundColor: "black", ...styles }} />
          )
        })}
      </div>
      {children}
    </div>
  )
}

export default BorderAnim;