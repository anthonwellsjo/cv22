import React, { useEffect, useRef, useState } from 'react';
import GetMediaPort from '../Misc/GetMediaPort';
import TechContainer from '../Misc/techContainer/TechContainer';
import { useViewport } from '../Misc/ViewPort';

import { MediaPort } from '../../enums'


interface props {
  tech: Tech[],
  techTypes: string[]
}
type SortedTechType = "Language" | "Framework" | "Library" | "Source control" | "CMS" | "App communication" | "ORM" | "State machine";

const Skills: React.FC<props> = ({ tech, techTypes }) => {
  const [visibleTech, setVisibleTech] = useState<Tech[]>([]);
  const [categoryCurrentlyViewed, setCategoryCurrentlyViewed] = useState<string | undefined>()
  const { width, height } = useViewport();
  const mediaport = GetMediaPort({ width, height });
  const isDesktop = mediaport === MediaPort.desktop;

  function refilterVisibleTech(command: "add" | "remove", techTypeSelected: string) {
    switch (command) {
      case "add": {
        setVisibleTech(tech.filter(t => {
          console.log(t.title, techTypeSelected);
          return t.techType.filter(tt => tt.techType.includes(techTypeSelected)).length > 0;
        }));
        return;
      }
      case "remove": {
        setVisibleTech([]);
        return;
      }
    }
  }

  const onClickCatEvent = (techTypeSelected: string) => {
    if (categoryCurrentlyViewed === techTypeSelected) {
      setCategoryCurrentlyViewed(undefined);
      refilterVisibleTech("remove", techTypeSelected);
    } else {
      setCategoryCurrentlyViewed(techTypeSelected);
      refilterVisibleTech("add", techTypeSelected);
    }
  }

  const getItemsPerRow = () => {
    const items = Math.floor(width! / 170);
    if (items > 5) return 5;
    else return items;
  }

  const getItemSize = () => {
    const size = width! / 15;
    if (size > 50) return 50;
    return size;
  }


  return (
    <div style={{ position: "relative", backgroundColor: "yellow", display: "flex", alignItems: "center", width: "90%", zIndex: 1 }}>
      <div style={{ position: "relative", width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
        {techTypes.map(t => {
          return (
            <div key={t}>
              <h4 onClick={() => { onClickCatEvent(t) }} style={{ cursor: "pointer", fontFamily: "Text", fontWeight: categoryCurrentlyViewed === t ? "bold" : "normal", fontSize: ".9em" }} >{t}</ h4>
            </div>
          )
        })}
      </div>
      {/* <div style={{ position: "absolute", right: `${width! / 100}%` }}>
        {visibleTech && <TechContainer itemSize={getItemSize()} tech={visibleTech.length === 0 && isDesktop ? tech : visibleTech} itemsPerRow={getItemsPerRow()} />}
      </div> */}
    </div >
  )

}

export default Skills;


