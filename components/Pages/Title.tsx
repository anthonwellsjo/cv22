import React from 'react';
import { a, useSpring } from '@react-spring/web'

interface props {
  name: string,
  scroll: number
}

const Title: React.FC<props> = ({ name }) => {
  const styles = useSpring({
    from: { top: "150%", opacity: 0 },
    to: { top: "0px", opacity: 1 },
    config: {
      friction: 20,
      tension: 40
    }
  })


  return (
    <div style={{ backgroundColor: "rgba(255,255,255,0.2)", position: "absolute", width: "100%", top: 0, height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <a.h2 className="page-header" style={{ textAlign: "center", opacity: styles.opacity, fontWeight: 400, fontFamily: "Roboto", transform: "rotate(5deg)" }}>{name}</a.h2>
    </div>
  )
}

export default Title;