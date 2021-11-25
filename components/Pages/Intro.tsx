import React, { useEffect, useRef, useState } from 'react';
import Head from "next/head";
import { a, useSpring } from '@react-spring/web';
import { useViewport } from '../Misc/ViewPort';
import GetMediaPort from '../Misc/GetMediaPort';
import { MediaPort } from '../../enums';



const IntroPage: React.FC = () => {
  const [font, setFont] = useState("Handwriting");
  const { width, height } = useViewport();
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);



  const fontFlix = (time: number, time2: number) => {
    setTimeout(() => {
      if (mounted.current) {
        setFont("Roboto");
      }
      setTimeout(() => {
        if (mounted.current) {
          setFont("Handwriting");
        }
        setTimeout(() => {
          if (mounted.current) {
            setFont("Roboto");
          }
          setTimeout(() => {
            if (mounted.current) {
              setFont("Handwriting");
              fontFlix(Math.random() * 5000, Math.random() * 500);
            }
          }, time2);
        }, 20);
      }, 50);
    }, time);
  }


  const [text, setText] = useState("");
  const toText = `Carl Anthon Wellsjö`;

  const styles = useSpring({
    from: {
      color: "black"
    },
    to: {
      color: "black"
    },
    delay: 1500,
    config: {
      mass: 100
    }
  },
  )



  useEffect(() => {
    fontFlix(2000, Math.random() * 500);
  }, [])

  const mediaPort = GetMediaPort({ height, width });

  if (mediaPort === MediaPort.mobile) return (

    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <a.h1 id="anthon-wellsjo" style={{ fontWeight: 400, fontFamily: font, color: styles.color as any, lineBreak: "anywhere" }}>Carl Anthon Wellsjö</a.h1>
    </div>

  )

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <a.h1 id="anthon-wellsjo" style={{ fontWeight: 400, fontFamily: font, color: styles.color as any }}>Carl Anthon Wellsjö</a.h1>
    </div>
  )
}

export default IntroPage;