import React, { useState } from 'react';
import Image from 'next/image';
import { useViewport } from './ViewPort';
import BorderAnim from './BorderAnimations/BorderAnim';

interface props {
  item: WorkDocument.RootObject
}

const WorkItem: React.FC<props> = ({ item }) => {
  const [hover, setHover] = useState(false);
  const { width, height } = useViewport();
  return (
    <div onMouseEnter={() => { setHover(true) }} style={{ display: "flex", justifyContent: "center", cursor: "pointer", position: "relative", width: "100%", height: `${height! * 0.3}px`, marginBottom: "20px", opacity: hover ? 1 : 0.2 }}>
      <BorderAnim scroll={20} zone={[0, 100]}>
        <div style={{ backgroundColor: item.projectColor, width: "100%", height: `${height! * 0.2}px`, outline: "relative", border: "1px solid grey", display: "flex", alignContent: "center", justifyContent: "center", margin: "10px auto" }} >
          {/* <h1 style={{position:"absolute"}}>{item.title}</h1> */}
        </div>
      </BorderAnim>
    </div>
  )
}

export default WorkItem;