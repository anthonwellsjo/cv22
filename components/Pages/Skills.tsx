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
    <div className="contentBoxLeft" style={{ position: "absolute", marginTop: "100px", display: "flex",  width: "90%", zIndex: 1 }}>
      <div style={{ width: "100%" }}>
        {techTypes.map(t => {
          return (
            <h4 onClick={() => { onClickCatEvent(t) }} style={{ cursor: "pointer", lineHeight: "1px", lineBreak: "unset", fontFamily: "Text", fontWeight: categoryCurrentlyViewed === t ? "bold" : "normal", fontSize: ".9em" }} key={t}>{t}</ h4>
          )
        })}
      </div>
      <div style={{ position: "absolute", right: `${width! / 100}%` }}>
        {visibleTech && <TechContainer itemSize={getItemSize()} tech={visibleTech.length === 0 && isDesktop ? tech : visibleTech} itemsPerRow={getItemsPerRow()} />}
      </div>
    </div >
  )

}

export default Skills;


