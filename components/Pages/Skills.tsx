import React, { useEffect, useState } from 'react';
import TechContainer from '../Misc/techContainer/TechContainer';

interface props {
  tech: Tech[],
  techTypes: string[]
}
type SortedTechType = "Language" | "Framework" | "Library" | "Source control" | "CMS" | "App communication" | "ORM" | "State machine";

const Skills: React.FC<props> = ({ tech, techTypes }) => {
  const [windowWidth, setWindowWidth] = useState(1000);
  const [visibleTech, setVisibleTech] = useState<Tech[]>([]);
  const [categories, setCategories] = useState<string[]>(["Javascript"])
  let sortedTech: { [key in SortedTechType]: Tech[] } = { "Language": [], "Framework": [], "Library": [], "Source control": [], "CMS": [], "App communication": [], "ORM": [], "State machine": [] };
  const techToSort: SortedTechType[] = ["Language", "Framework", "Library", "Source control", "CMS", "App communication", "ORM", "State machine"];
  techToSort.forEach(tts => {
    const arr = tech.filter(t => t.techType?.techType === tts)

    sortedTech[`${tts}`] = arr;
  })
  const otherTech = tech.filter(t => !techToSort.includes(t.techType?.techType as SortedTechType));

  function setWindowSize() {
    setWindowWidth(window.innerWidth)
  }

  const onClickCatEvent = (name: string) => {
    if(categories.includes(name)){

    }

  }

  useEffect(() => {
    console.log("techTypes", techTypes);
    setVisibleTech(tech);

    setWindowSize();
    window.addEventListener("resize", setWindowSize);

    return () => { window.removeEventListener("resize", setWindowSize); }
  }, [])



  return (
    <div style={{ position: "absolute", top: "50%", display: "flex", width: "90%", }}>
      <div >
        {techTypes.map(t => {
          return (
            <h4 onClick={() => { onClickCatEvent(t) }} style={{ lineHeight: "1px", fontFamily: "Text", fontWeight: categories.includes(t) ? "bold" : "normal", fontSize: ".9em" }} key={t}>{t}</h4>
          )
        })}
      </div>
      <div style={{ position: "absolute", top: "0", right: "0" }}>
        {visibleTech && <TechContainer tech={visibleTech} itemsPerRow={8} />}
      </div>
    </div>
  )

}

export default Skills;


