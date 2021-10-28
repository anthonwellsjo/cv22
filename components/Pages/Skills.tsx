import React, { useEffect, useRef, useState } from 'react';
import TechContainer from '../Misc/techContainer/TechContainer';
import { GetVisibleTechAfterAdding, FilterVisibleTechAfterRemoval } from '../utils/utils';

interface props {
  tech: Tech[],
  techTypes: string[]
}
type SortedTechType = "Language" | "Framework" | "Library" | "Source control" | "CMS" | "App communication" | "ORM" | "State machine";

const Skills: React.FC<props> = ({ tech, techTypes }) => {
  const [windowWidth, setWindowWidth] = useState(1000);
  const [visibleTech, setVisibleTech] = useState<Tech[]>([]);
  const [categoriesCurrentlyViewed, setcategoriesCurrentlyViewed] = useState<string[]>([])
  const categoriesCurrentlyViewedRef = useRef(categoriesCurrentlyViewed);
  const removeCategory = (category: string) => {
    setcategoriesCurrentlyViewed(prev => ([...prev.filter(c => c !== category)]));
    categoriesCurrentlyViewedRef.current = categoriesCurrentlyViewedRef.current.filter(c => c !== category);
  }
  const addCategory = (category: string) => {
    setcategoriesCurrentlyViewed(prev => ([...prev, category]));
    categoriesCurrentlyViewedRef.current = [...categoriesCurrentlyViewedRef.current, category];
  }
  const addCategories = (categories: string[]) => {
    setcategoriesCurrentlyViewed(prev => ([...prev, ...categories]));
    categoriesCurrentlyViewedRef.current = [...categoriesCurrentlyViewedRef.current, ...categories];
  }
  let sortedTech: { [key in SortedTechType]: Tech[] } = { "Language": [], "Framework": [], "Library": [], "Source control": [], "CMS": [], "App communication": [], "ORM": [], "State machine": [] };

  const resetSelectedCategories = () => {
    const categoriesToVerify = techTypes.filter(t => !categoriesCurrentlyViewedRef.current.includes(t));

    const categoriesToAdd = categoriesToVerify.filter(tt1 => {
      const allTechWithThatCategory = tech.filter(t => {
        let thisTechIsInThatCategory = false;
        t.techType.forEach(tt2 => {
          if (tt2.techType === tt1) { thisTechIsInThatCategory = true; }
        });
        return thisTechIsInThatCategory;
      });

      const techsVisibleInThatCategory = allTechWithThatCategory.filter(t => visibleTech.includes(t));
      return techsVisibleInThatCategory.length === allTechWithThatCategory.length && techsVisibleInThatCategory.length > 0;

    });

    addCategories(categoriesToAdd);
  }

  function setWindowSize() {
    setWindowWidth(window.innerWidth);
  }
  function refilterVisibleTech(command: "add" | "remove", techTypeSelected: string) {
    switch (command) {
      case "add": {
        setVisibleTech(prev => {
          const newVisibleTech = [...prev, ...GetVisibleTechAfterAdding(prev, categoriesCurrentlyViewedRef.current, tech)];
          return newVisibleTech;
        });
        return;
      }
      case "remove": {
        setVisibleTech(prev => {
          const techLeft = [...FilterVisibleTechAfterRemoval(prev, categoriesCurrentlyViewedRef.current)];
          return techLeft;
        });
        return;
      }
    }
  }

  const onClickCatEvent = (techTypeSelected: string) => {
    if (categoriesCurrentlyViewedRef.current.includes(techTypeSelected)) {
      removeCategory(techTypeSelected);
      refilterVisibleTech("remove", techTypeSelected);
    } else {
      addCategory(techTypeSelected);
      refilterVisibleTech("add", techTypeSelected);
      resetSelectedCategories();
    }
  }

  const getItemsPerRow = () => {
    const items = Math.floor(windowWidth / 170);
    if (items > 5) return 5;
    else return items;
  }

  const getItemSize = () => {
    const size = windowWidth / 10;;
    if (size > 50) return 50;
    return size;
  }

  useEffect(() => {
    // console.log("techTypes", techTypes);
    // setVisibleTech(tech);

    setWindowSize();
    window.addEventListener("resize", setWindowSize);

    return () => { window.removeEventListener("resize", setWindowSize); }
  }, [])



  return (
    <div className="contentBoxLeft" style={{ position: "absolute", marginTop: "100px", display: "flex", width: "90%", zIndex: 1 }}>
      <div style={{ width: "100%" }}>
        {techTypes.map(t => {
          return (
            <h4 onClick={() => { onClickCatEvent(t) }} style={{ cursor: "pointer", lineHeight: "1px", lineBreak: "unset", fontFamily: "Text", fontWeight: categoriesCurrentlyViewed.includes(t) ? "bold" : "normal", fontSize: ".9em" }} key={t}>{t}</ h4>
          )
        })}
      </div>
      <div style={{position: "absolute", top: "5%", right: `${windowWidth / 100}%` }}>
      {visibleTech && <TechContainer itemSize={getItemSize()} tech={visibleTech} itemsPerRow={getItemsPerRow()} />}
    </div>
    </div >
  )

}

export default Skills;

