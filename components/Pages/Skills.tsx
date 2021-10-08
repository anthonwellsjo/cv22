import React, { useEffect, useState } from 'react';
import TechContainer from '../Misc/techContainer/TechContainer';

interface props {
  tech: Tech[],
  techTypes: string[]
}
type SortedTechType = "Language" | "Framework" | "Library" | "Source control" | "CMS" | "App communication" | "ORM" | "State machine";

const Skills: React.FC<props> = ({ tech, techTypes }) => {
  console.log("tech to tech", tech);
  const [windowWidth, setWindowWidth] = useState(1000);
  const [visibleTech, setVisibleTech] = useState<Tech[]>([]);
  const [categories, setCategories] = useState<string[]>([])
  let sortedTech: { [key in SortedTechType]: Tech[] } = { "Language": [], "Framework": [], "Library": [], "Source control": [], "CMS": [], "App communication": [], "ORM": [], "State machine": [] };
  const techToSort: SortedTechType[] = ["Language", "Framework", "Library", "Source control", "CMS", "App communication", "ORM", "State machine"];
  techToSort.forEach(tts => {
    const arr = tech.filter(t => t.techType?.techType === tts)

    sortedTech[`${tts}`] = arr;
  })
  const otherTech = tech.filter(t => !techToSort.includes(t.techType?.techType as SortedTechType));

  function setWindowSize() {
    setWindowWidth(window.innerWidth);
  }
  function refilterVisibleTech(command: "add" | "remove") {
    switch (command) {
      case "add": {
        console.log("add tech");
        return;
      }
      case "remove": {
        console.log("remove tech");
        return;
      }
    }
  }

  const onClickCatEvent = (name: string) => {
    if (categories.includes(name)) {
      setCategories(prev => ([...prev.filter(c => c !== name)]));
      refilterVisibleTech("remove");
    } else {
      setCategories(prev => ([...prev, name]));
      refilterVisibleTech("add");
    }
  }

  useEffect(() => {
    console.log("visible tech", visibleTech);
  }, [visibleTech])

  useEffect(() => {
    console.log("techTypes", techTypes);
    setVisibleTech(tech);

    setWindowSize();
    window.addEventListener("resize", setWindowSize);

    return () => { window.removeEventListener("resize", setWindowSize); }
  }, [])



  return (
    <div style={{ position: "absolute", top: "50%", display: "flex", width: "90%", zIndex: 1 }}>
      <div >
        {techTypes.map(t => {
          return (
            <h4 onClick={() => { onClickCatEvent(t) }} style={{ cursor: "pointer", lineHeight: "1px", fontFamily: "Text", fontWeight: categories.includes(t) ? "bold" : "normal", fontSize: ".9em" }} key={t}>{t}</h4>
          )
        })}
      </div>
      <div style={{ position: "absolute", top: "5%", right: "10%" }}>
        {visibleTech && <TechContainer tech={visibleTech} itemsPerRow={5} />}
      </div>
    </div>
  )

}

export default Skills;


