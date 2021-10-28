import React, { useEffect, useState } from 'react';
import Image from 'next/image';



const BioPage: React.FC = () => {


  return (
    <div style={{ position: "relative", width: "100%", height: "50%", marginTop: "60%" }}>
      <div className="contentBoxLeft" style={{ position: "absolute", borderLeft: "none", top: 0, left: 0, flexDirection: "column", display: "flex", alignItems: "center", width: "70%" }}>
        <div>
          <p><strong>Hey,</strong></p>
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
      <div className="contentBoxRight" style={{
        position: "absolute",
        right: 0,
        width: "30%",
        height: "200px",
        top: "-200px",
        borderRight: "none",
        outline: "none",
        borderLeft: "2px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0
      }}>
        {/* <Image src={"/profile.jpg"} height={150} width={250} objectFit="scale-down" alt="profile photo" /> */}
      </div>
    </div>
  )
}

export default BioPage;