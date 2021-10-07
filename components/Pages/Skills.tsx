import React, { useEffect, useState } from 'react';
import TechContainer from '../Misc/techContainer/TechContainer';

interface props {
  tech: Tech[]
}
type SortedTechType = "Language" | "Framework" | "Library" | "Source control" | "CMS" | "App communication" | "ORM" | "State machine";

const Skills: React.FC<props> = ({ tech }) => {
  const [windowWidth, setWindowWidth] = useState(1000);
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

  useEffect(() => {
    setWindowSize();

    window.addEventListener("resize", setWindowSize);

    return () => { window.removeEventListener("resize", setWindowSize); }
  }, [])


  console.log("tech", tech);
  console.log("sorted tech", sortedTech);
  console.log("other tech", otherTech);
  if (windowWidth > 1100) {
    return (
      <div style={{ position: "absolute", top: "50%", display: "flex", justifyContent: "space-evenly", width: "100%", }}>
        {techToSort.map(t => {
          return (
            <div key={t} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <p style={{ textAlign: "center" }}><strong>{t}</strong></p>
              <TechContainer tech={sortedTech[`${t}`]} itemsPerRow={1} />
            </div>
          )
        })}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <p><strong>Other</strong></p>
          <TechContainer tech={otherTech} itemsPerRow={1} />
        </div>
      </div>
    )
  } else return(

    <h1>hej</h1>
  )
}

export default Skills;


