import React, { useEffect, useState } from 'react';



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

      <p style={{ fontFamily: "Roboto" }}>{text}</p>

    </div>
  )
}

export default IntroPage;