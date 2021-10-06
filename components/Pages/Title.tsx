import React, { useEffect, useState } from 'react';
import { a, useSpring } from '@react-spring/web'

interface props {
  name: string,
  scroll: number
}

const Title: React.FC<props> = ({ name }) => {
  const [font, setFont] = useState("Handwriting");
  const fontFlix = (time: number, time2: number) => {
    setTimeout(() => {
      setFont("Roboto");
      setTimeout(() => {
        setFont("Handwriting");
        setTimeout(() => {
          setFont("Roboto");
          setTimeout(() => {
            setFont("Handwriting");
            fontFlix(Math.random() * 5000, Math.random() * 500);
          }, time2);
        }, 20);
      }, 50);
    }, time);
  }
  const styles = useSpring({
    from: { top: "150%", opacity: 0 },
    to: { top: "0px", opacity: 1 },
    config: {
      friction: 20,
      tension: 40
    }
  })

  useEffect(() => {
    fontFlix(10000, Math.random() * 100);
  }, [])


  return (
    <div style={{ backgroundColor: "rgba(255,255,255,0.2)", position: "absolute", width: "100%", top: 0, height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <a.h2 className="page-header" style={{ textAlign: "center", opacity: styles.opacity, fontWeight: 100, fontFamily: font }}>{name}</a.h2>
    </div>
  )
}

export default Title;