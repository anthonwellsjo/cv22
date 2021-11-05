import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useViewport } from '../Misc/ViewPort';
import GetMediaPort from '../Misc/GetMediaPort';



const BioPage: React.FC = () => {
  const { width, height } = useViewport();
  const port = GetMediaPort({ width, height });


  return (
    <div style={{}}>
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

  )
}

export default BioPage;