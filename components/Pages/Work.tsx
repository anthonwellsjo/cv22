import React from 'react';
import Image from 'next/image';
import { useViewport } from '../Misc/ViewPort';

interface props {
  work: WorkDocument.RootObject[]
}

const WorkDesktop: React.FC<props> = ({ work }) => {
  const { width, height } = useViewport();
  return (
    <div style={{ position: "absolute", top: "25%", width: "100vw" }}>
      <div style={{ display: "flex", overflowX: "scroll", width:"100vw", }}>
        {work.map(w => {
          return (
            <div style={{boxSizing: "border-box", height: `${height! / 2}px`, width: `${height! / 2}px`, position: "relative", border: "1px solid black", display: "flex", alignContent: "center", justifyContent: "center", margin: "10px" }} key={w._id}>
              {/* <h1 style={{position:"absolute"}}>{w.title}</h1> */}
              <Image title={w.title} layout="fill" alt="Project image" src={w.mainImage.asset.url} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default WorkDesktop;