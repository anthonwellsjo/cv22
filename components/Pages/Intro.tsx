import React, { useEffect, useState } from 'react';
import Head from "next/head";
import { a, useSpring } from '@react-spring/web';



const IntroPage: React.FC = () => {
  const [text, setText] = useState("");
  const toText = `Carl Anthon Wellsjö`;

  const styles = useSpring({
    from: {
      color: "white"
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

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "120px" }}>
      <a.h1 style={{ fontFamily: "Handwriting", fontSize: "100px", color: styles.color as any }}>Carl Anthon Wellsjö</a.h1>
    </div>
  )
}

export default IntroPage;