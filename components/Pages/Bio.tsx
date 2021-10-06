import React, { useEffect, useState } from 'react';



const BioPage: React.FC = () => {


  return (
    <div style={{ position: "absolute", top: "100%" }}>
      <strong>Hey,</strong>
      <div style={{ wordBreak: "break-word" }}>
        <p>
          My name is <strong>Anthon</strong> and I&apos;m a Swedish <strong>full-stack web developer</strong> based in Perugia, Italy with my wife and three kids.
          
          I am <strong>fluent in four languages</strong> (Swedish, French, Italian, and English) and other than passionately developing websites, I love garden work, kite surfing, and playing the guitar.
          <br></br>
          <br></br>
          If you consider hiring me, then you can count on an effective and open minded coworker. I love learning, and arriving at the best solutions, no matter who had the idea.
        </p>
      </div>
    </div>
  )
}

export default BioPage;