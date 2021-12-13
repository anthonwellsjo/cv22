import React, { useEffect, useRef, useState } from 'react';
import GetMediaPort from '../Misc/GetMediaPort';
import TechContainer from '../Misc/techContainer/TechContainer';
import { useViewport } from '../Misc/ViewPort';

import { MediaPort } from '../../enums'
import { getTechItemSize, getTechItemsPerRow } from '../utils/utils';


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






  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", width: "90%", height: "100%", zIndex: 1 }}>
      <div style={{ position: "absolute", height: "80%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {techTypes.map(t => {
          return (
            <h4 onClick={() => { onClickCatEvent(t) }} key={t} style={{ margin: 0, padding: 0, cursor: "pointer", fontFamily: "Text", fontWeight: categoryCurrentlyViewed === t ? "bold" : "normal", fontSize: ".9em" }} >{t}</ h4>
          )
        })}
      </div>
      <div style={{ position: "absolute", right: `${width! / 100}%` }}>
        {visibleTech && <TechContainer itemSize={getTechItemSize(width!)} tech={visibleTech.length === 0 && isDesktop ? tech : visibleTech} itemsPerRow={getTechItemsPerRow(width!)} />}
      </div>
    </div >
  )

}

export default Skills;


