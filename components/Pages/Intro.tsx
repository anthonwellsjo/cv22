import React, { useEffect, useState } from 'react';
import Head from "next/head";
import Link from "next/link";



const IntroPage: React.FC = () => {
  const [text, setText] = useState("");
  const toText = `Carl Anthon Wellsjö`;

  useEffect(() => {
    toText.split("").forEach((c, i) => {
      setTimeout(() => {
        setText(prev => (prev + c))
      }, i * 50)
    })

  }, [])

  return (
    <div style={{ position: "absolute" }}>
      <Head>
        <link
          rel="preload"
          href="/fonts/ReenieBeanie/ReenieBeanie.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <h1 style={{ fontFamily: "Handwriting", fontSize: "70px" }}>{text}</h1>
    </div>
  )
}

export default IntroPage;