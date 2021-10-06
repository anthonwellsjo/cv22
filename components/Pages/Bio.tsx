import React, { useEffect, useState } from 'react';
import Image from 'next/image';



const BioPage: React.FC = () => {


  return (
    <div style={{ position: "absolute", top: "100%", flexDirection: "column", display: "flex", alignItems: "center" }}>
      <div style={{ width: "180px", height: "180px", minHeight: "100px", borderRadius: "100%", top: "-90px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "1px 1px 30px lightgrey", marginBottom:"50px"}}>
        <Image src={"/profile.jpg"} height={"200px"} width={"200px"} alt="Image of Anthon" />
      </div>
      <div>
        <strong>Hey,</strong>
        <div style={{ wordBreak: "break-word" }}>
          <p>
            My name is <strong>Anthon</strong> and I&apos;m a Swedish <strong>full-stack web developer</strong> based in Perugia, Italy with my wife and three kids.

            I am <strong>fluent in four languages</strong> (Swedish, French, Italian, and English) and other than passionately developing websites, love garden work, kite surfing, and playing the guitar.
            <br></br>
            <br></br>
            If you consider hiring me, then you can count on an <strong>effective and open minded coworker.</strong> I love learning, and arriving at the best solutions, no matter who had the idea.
          </p>
        </div>
      </div>
    </div>
  )
}

export default BioPage;