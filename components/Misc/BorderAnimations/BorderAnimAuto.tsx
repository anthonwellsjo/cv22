import { a, useSprings } from '@react-spring/web';
import React, { createRef, useEffect, useMemo, useRef, useState } from 'react';
import { getAnimPlates, Plate } from '../../utils/plates';
import { getPercentageOfZone, getScrollPercentage, isInZone } from '../../utils/scroll-helpers';

interface props {
  children: React.ReactNode,
  rotate?: string,
  marginTop?: string,
  mobile: boolean
}

const BorderAnimAuto: React.FC<props> = ({ children, rotate, marginTop = "auto", mobile }) => {
  const zone: [number, number] = [0, 100];
  const [scroll, _setScroll] = useState<number>(0);
  const scrollRef = useRef(scroll);
  const setScroll = (newValue: number) => {
    _setScroll(newValue);
    scrollRef.current = newValue;
  }
  const [beenSeen, setBeenSeen] = useState(false);
  const [plates, setPlates] = useState<{ top: Plate[], right: Plate[], bottom: Plate[], left: Plate[] }>({ top: [], right: [], bottom: [], left: [] });
  const [divDimensions, setDivDimensions] = useState<{ width: number, height: number }>({ width: 1000, height: 1000 });
  const divDimensionsRef = useRef(divDimensions);
  const setDivDimensionsExpanded = (dimensions: { height: number, width: number }) => {
    divDimensionsRef.current = dimensions;
    setDivDimensions(dimensions);
  }
  const divRef: React.LegacyRef<HTMLDivElement> | undefined = createRef();
  const springConfig = {
    mass: 1,
    friction: 50,
    tension: 200
  }

  const doTheDivDimensionsThing = () => {
    const width = divRef.current?.clientWidth!;
    const height = divRef.current?.clientHeight!;
    if (divDimensionsRef.current.height !== height || divDimensionsRef.current.width !== width) {
      setDivDimensionsExpanded({ width: width, height: height });
    }
  }

  useEffect(() => {
    doTheDivDimensionsThing();

  }, [divRef])

  useEffect(() => {
    if (divRef.current != null && !beenSeen) {
      var observer = new IntersectionObserver(function (entries) {
        // isIntersecting is true when element and viewport are overlapping
        // isIntersecting is false when element and viewport don't overlap
        if (entries[0].isIntersecting === true) {
          setBeenSeen(true);
        }
      }, { threshold: [0] });
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current != null) observer.unobserve(divRef.current);
    }
  }, [divRef, beenSeen])

  useEffect(() => {
    if (beenSeen && scrollRef.current < 100) {
      setInterval(() => {
        setScroll(scrollRef.current += 5)
      }, 100)
    }
  }, [beenSeen])

  useEffect(() => {
    window.addEventListener("resize", doTheDivDimensionsThing);
    return () => { window.removeEventListener("resize", doTheDivDimensionsThing) };
  }, [])

  const setNumberOfPlates = () => {

    let horizontalPlates = 0;
    let sidePlates = 0;



    switch (true) {
      case (divDimensionsRef.current.width < 400): horizontalPlates = divDimensionsRef.current.width / 40; break;
      case (divDimensionsRef.current.width < 600): horizontalPlates = divDimensionsRef.current.width / 60; break;
      case (divDimensionsRef.current.width < 1000): horizontalPlates = divDimensionsRef.current.width / 80; break;
      case (divDimensionsRef.current.width < 1200): horizontalPlates = divDimensionsRef.current.width / 100; break;
      default: horizontalPlates = divDimensionsRef.current.width / (divDimensionsRef.current.width / 8);
    }
    switch (true) {
      case (mobile && divDimensionsRef.current.height < 200 && divDimensionsRef.current.height < divDimensionsRef.current.width): sidePlates = divDimensionsRef.current.height / 10; break;
      case (mobile && divDimensionsRef.current.height < 250 && divDimensionsRef.current.height < divDimensionsRef.current.width): sidePlates = divDimensionsRef.current.height / 12; break;
      case (mobile && divDimensionsRef.current.height < 300 && divDimensionsRef.current.height < divDimensionsRef.current.width): sidePlates = divDimensionsRef.current.height / 15; break;
      case (mobile && divDimensionsRef.current.height < 350 && divDimensionsRef.current.height < divDimensionsRef.current.width): sidePlates = divDimensionsRef.current.height / 20; break;
      case (mobile && divDimensionsRef.current.height < 400 && divDimensionsRef.current.height < divDimensionsRef.current.width): sidePlates = divDimensionsRef.current.height / 18; break;

      case (!mobile && divDimensionsRef.current.height < 200 && divDimensionsRef.current.height < divDimensionsRef.current.width): sidePlates = divDimensionsRef.current.height / 30; break;
      case (!mobile && divDimensionsRef.current.height < 250 && divDimensionsRef.current.height < divDimensionsRef.current.width): sidePlates = divDimensionsRef.current.height / 40; break;
      case (!mobile && divDimensionsRef.current.height < 300 && divDimensionsRef.current.height < divDimensionsRef.current.width): sidePlates = divDimensionsRef.current.height / 50; break;
      case (!mobile && divDimensionsRef.current.height < 350 && divDimensionsRef.current.height < divDimensionsRef.current.width): sidePlates = divDimensionsRef.current.height / 70; break;
      case (!mobile && divDimensionsRef.current.height < 400 && divDimensionsRef.current.height < divDimensionsRef.current.width): sidePlates = divDimensionsRef.current.height / 60; break;

      case (divDimensionsRef.current.height < 200 && divDimensionsRef.current.height > divDimensionsRef.current.width): sidePlates = divDimensionsRef.current.height / 50; break;
      case (divDimensionsRef.current.height < 250 && divDimensionsRef.current.height >= 200 && divDimensionsRef.current.height > divDimensionsRef.current.width): sidePlates = divDimensionsRef.current.height / 60; break;
      case (divDimensionsRef.current.height < 300 && divDimensionsRef.current.height >= 250 && divDimensionsRef.current.height > divDimensionsRef.current.width): sidePlates = divDimensionsRef.current.height / 50; break;
      case (divDimensionsRef.current.height < 350 && divDimensionsRef.current.height >= 301 && divDimensionsRef.current.height > divDimensionsRef.current.width): sidePlates = divDimensionsRef.current.height / 40; break;
      case (divDimensionsRef.current.height < 400 && divDimensionsRef.current.height >= 351 && divDimensionsRef.current.height > divDimensionsRef.current.width): sidePlates = divDimensionsRef.current.height / 40; break;
      default: sidePlates = divDimensionsRef.current.height / (divDimensionsRef.current.height / 4);
    }
    setPlates({ top: getAnimPlates(horizontalPlates), right: getAnimPlates(sidePlates, horizontalPlates + 1), bottom: getAnimPlates(horizontalPlates, horizontalPlates + sidePlates + 1), left: getAnimPlates(sidePlates, horizontalPlates * 2 + sidePlates + 1) });
  }

  const getPlateLength = () => {
    switch (true) {
      case (divDimensionsRef.current.width < 400): return "4vw";
      case (divDimensionsRef.current.width < 600 && divDimensionsRef.current.width >= 400): return "3vw";
      case (divDimensionsRef.current.width < 1000 && divDimensionsRef.current.width >= 600): return "2vw";
      case (divDimensionsRef.current.width < 1200 && divDimensionsRef.current.width >= 1000): return "2vw";
      default: return "2vw";
    }

  }
  const getPlateThickness = () => {

    switch (true) {
      case (divDimensionsRef.current.width < 400): return "0.66vw";
      case (divDimensionsRef.current.width < 600 && divDimensionsRef.current.width >= 400): return "0.36vw";
      case (divDimensionsRef.current.width < 1000 && divDimensionsRef.current.width >= 600): return "0.26vw";
      case (divDimensionsRef.current.width < 1200 && divDimensionsRef.current.width >= 1000): return "0.25vw";
      case (divDimensionsRef.current.width >= 1200): return "2vw";
      default: return "0.25vw";
    }

  }

  useEffect(() => {
    setNumberOfPlates();
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


  const thePlateIsVisibileIsIt = (order: number) => {
    const totPlates = getTotalNoOfPlates();
    const orderPercentage = order / totPlates * 100;
    const scrollPerc = getPercentageOfZone(zone, scroll);
    // console.log(order, scrollPerc, orderPercentage - scrollPerc);
    if ((scrollPerc - orderPercentage) > 0 || scrollPerc > 90) return true;
    return false;
  }

  const TopSprings = useSprings(
    plates.top.length,
    plates.top.map(plate => (
      {
        transform: thePlateIsVisibileIsIt(plate.order) ? `rotate(${(plate.order / 10).toString()}deg) translateX(0px) translateY(0px)` : `rotate(${getRandomRotation()}deg) translateX(${getRandomPosition("x")}px) translateY(${getRandomPosition("y")}px)`,
        opacity: thePlateIsVisibileIsIt(plate.order) ? 1 : 0,
        config: springConfig
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
        config: springConfig
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
        config: springConfig
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
        config: springConfig
      }
    )
    )
  )

  return (
    <div ref={divRef} style={{ transform: rotate ? `rotate(${rotate})` : "none", width: "80%", position: "absolute", top: "40%", padding: "5%", marginTop: marginTop }}>
      {divRef != null && (
        <>
          <div style={{ left: 0, top: 0, width: "100%", position: "absolute", display: "flex", justifyContent: "space-evenly" }}>
            {TopSprings.map((styles) => {
              return (
                <a.div key={styles.transform.id} style={{ transformOrigin: "center", height: getPlateThickness(), width: getPlateLength(), backgroundColor: "black", ...styles }} />
              )
            })}
          </div>
          <div style={{ top: 0, right: 0, height: "100%", position: "absolute", display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
            {RightSprings.map((styles) => {
              return (
                <a.div key={styles.transform.id} style={{ transformOrigin: "center", height: getPlateLength(), width: getPlateThickness(), backgroundColor: "black", ...styles }} />
              )
            })}
          </div>
          <div style={{ left: 0, bottom: 0, width: "100%", position: "absolute", display: "flex", flexDirection: "row-reverse", justifyContent: "space-evenly" }}>
            {BottomSprings.map((styles) => {
              return (
                <a.div key={styles.transform.id} style={{ transformOrigin: "center", width: getPlateLength(), height: getPlateThickness(), backgroundColor: "black", ...styles }} />
              )
            })}
          </div>
          <div style={{ top: 0, left: 0, height: "100%", position: "absolute", display: "flex", flexDirection: "column-reverse", justifyContent: "space-evenly" }}>
            {LeftSprings.map((styles) => {
              return (
                <a.div key={styles.transform.id} style={{ transformOrigin: "center", height: getPlateLength(), width: getPlateThickness(), backgroundColor: "black", ...styles }} />
              )
            })}
          </div>
        </>
      )
      }
      {children}
    </div>
  )
}

export default BorderAnimAuto;