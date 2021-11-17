import React, { useEffect, useRef, useState } from 'react';
import GetMediaPort from '../Misc/GetMediaPort';
import TechContainer from '../Misc/techContainer/TechContainer';
import { useViewport } from '../Misc/ViewPort';
import { GetVisibleTechAfterAdding, FilterVisibleTechAfterRemoval } from '../utils/utils';

interface props {
  tech: Tech[],
  techTypes: string[]
}
type SortedTechType = "Language" | "Framework" | "Library" | "Source control" | "CMS" | "App communication" | "ORM" | "State machine";

const Skills: React.FC<props> = ({ tech, techTypes }) => {
  const [visibleTech, setVisibleTech] = useState<Tech[]>([]);
  const [categoryCurrentlyViewed, setCategoryCurrentlyViewed] = useState<string | undefined>()
  const { width, height } = useViewport();


  let sortedTech: { [key in SortedTechType]: Tech[] } = { "Language": [], "Framework": [], "Library": [], "Source control": [], "CMS": [], "App communication": [], "ORM": [], "State machine": [] };

  // const resetSelectedCategories = () => {
  //   const categoriesToVerify = techTypes.filter(t => !categoriesCurrentlyViewedRef.current.includes(t));

  //   const categoriesToAdd = categoriesToVerify.filter(tt1 => {
  //     const allTechWithThatCategory = tech.filter(t => {
  //       let thisTechIsInThatCategory = false;
  //       t.techType.forEach(tt2 => {
  //         if (tt2.techType === tt1) { thisTechIsInThatCategory = true; }
  //       });
  //       return thisTechIsInThatCategory;
  //     });

  //     const techsVisibleInThatCategory = allTechWithThatCategory.filter(t => visibleTech.includes(t));
  //     return techsVisibleInThatCategory.length === allTechWithThatCategory.length && techsVisibleInThatCategory.length > 0;

  //   });

  //   addCategories(categoriesToAdd);
  // }

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
    <div className="contentBoxLeft" style={{ position: "absolute", marginTop: "100px", display: "flex", width: "90%", zIndex: 1 }}>
      <div style={{ width: "100%" }}>
        {techTypes.map(t => {
          return (
            <h4 onClick={() => { onClickCatEvent(t) }} style={{ cursor: "pointer", lineHeight: "1px", lineBreak: "unset", fontFamily: "Text", fontWeight: categoryCurrentlyViewed === t ? "bold" : "normal", fontSize: ".9em" }} key={t}>{t}</ h4>
          )
        })}
      </div>
      <div style={{ position: "absolute", right: `${width! / 100}%` }}>
        {visibleTech && <TechContainer itemSize={getItemSize()} tech={visibleTech.length > 0 ? visibleTech : tech} itemsPerRow={getItemsPerRow()} />}
      </div>
    </div >
  )

}

export default Skills;


