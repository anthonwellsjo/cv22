import React, { useEffect, useRef, useState } from 'react';
import { a, useSpring } from '@react-spring/web'
import GetMediaPort from '../Misc/GetMediaPort';
import { MediaPort } from '../../enums';
import { useViewport } from '../Misc/ViewPort';

interface props {
  name: string,
  scroll: number
}

const Title: React.FC<props> = ({ name }) => {
  const { width, height } = useViewport();
  const [font, setFont] = useState("Header");
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  const fontFlix = (time: number, time2: number) => {
    setTimeout(() => {
      if (mounted.current) setFont("Handwriting");
      setTimeout(() => {
        if (mounted.current) setFont("Header");
        setTimeout(() => {
          if (mounted.current) {
            setFont("Handwriting");
            setTimeout(() => {
              setFont("Header");
              fontFlix(Math.random() * 5000, Math.random() * 500);
            }, time2);
          }
        }, 20);
      }, 50);
    }, time);
  }
  const fontFlix2 = (time: number) => {
    if (mounted.current) {
      setTimeout(() => {
        setFont("Handwriting");
        setTimeout(() => {
          setFont("Header");
        }, 50);
      }, time);
    }
  }


  const styles = useSpring({
    from: { top: "150%", opacity: 0 },
    to: { top: "0px", opacity: 1 },
    config: {
      friction: 20,
      tension: 40
    }
  })

  const onMouseEnterEventHandler = () => {
    fontFlix2(10);
    console.log("mouse enter")
  }

  useEffect(() => {
    fontFlix(10000, Math.random() * 100);
  }, [])

  if (GetMediaPort({ width, height }) !== MediaPort.mobile) {
    return (
      <div style={{ position: "absolute", width: "100%", top: 0, height: "100px", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1, }}>
        <a.h1 onMouseEnter={onMouseEnterEventHandler} className="pageHeader" style={{ textAlign: "center", opacity: styles.opacity, fontWeight: 100, fontFamily: font, textTransform: "uppercase" }}>{name}</a.h1>
      </div>
    )
  }
  return null;
}

export default Title;