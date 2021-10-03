import React, { useEffect, useState } from 'react';



const BioPage: React.FC = () => {
  const [text, setText] = useState("");
  const toText = `
  My name is Anthon and I'm a Swedish full-stack web developer based in Perugia, Italy with my wife and three kids.
  I speak four languages fluently (Swedish, French, Italian, and English) and other than passionately developing websites, I love garden work, kite surfing, and playing the guitar.
  If you consider hiring me, then you can count on an effective and open minded coworker. I love learning, and arriving at the best solutions, no matter who had the idea.`;

  useEffect(() => {
    toText.split("").forEach((c, i) => {
      setTimeout(() => {
        setText(prev => (prev + c))
      }, i * 2)
    })

  }, [])


  return (
    <div style={{ position: "absolute" }}>
      <h2>Hey,</h2>
      <div style={{ wordBreak: "break-word" }}>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default BioPage;