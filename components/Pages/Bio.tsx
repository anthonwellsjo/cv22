import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useViewport } from '../Misc/ViewPort';
import GetMediaPort from '../Misc/GetMediaPort';



const BioPage: React.FC = () => {
  const { width, height } = useViewport();
  const port = GetMediaPort({ width, height });


  return (
    <div style={{}}>
      <div style={{padding:"1em"}}>
        <p style={{fontSize:"1.5em", marginTop:"-.5em"}}>Hey,</p>
        <div style={{ wordBreak: "break-word" }}>
          <p>
            I&apos;m Anthon and I&apos;m a <strong>full-stack web developer</strong> since 2019. My current role includes <strong>project management</strong> and <strong>devops tasks</strong>.
            <br></br>
            <br></br>
            I develop apps with <strong>Typescript</strong> and <strong>C#</strong> in a feature oriented way. I&apos;m also obsessed with <strong>system architecture</strong> and <strong>documentation</strong>.
            <br></br>
            <br></br>
            I speak <strong>Swedish, French, Italian</strong> and <strong>English</strong> and in the past I&apos;ve worked as a music producer and a fashion model.
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