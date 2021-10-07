import React from 'react';
import TechContainer from '../Misc/techContainer/TechContainer';

interface props {
  tech: Tech[]
}
type SortedTechType = "Language" | "Framework" | "ORM";

const Skills: React.FC<props> = ({ tech }) => {

  let sortedTech: { [key in SortedTechType]: Tech[] | {} } = { "Framework": {}, "Language": {}, "ORM": {} };
  const techToSort: SortedTechType[] = ["Language", "Framework", "ORM",];
  techToSort.forEach(tts => {
    const arr = tech.filter(t => t.techType?.techType === tts)
    sortedTech[`${tts}`] = arr;
  })
  const otherTech = tech.filter(t => !techToSort.includes(t.techType?.techType as SortedTechType));


  console.log("tech", tech);
  console.log("sorted tech", sortedTech);
  console.log("other tech", otherTech);
  return (
    <div style={{ position: "absolute", top: "100%" }}>
      <strong>Languages</strong>
      <TechContainer tech={sortedTech.Language} itemsPerRow={10} />
      <strong>Frameworks</strong>
      <TechContainer tech={sortedTech.Framework} itemsPerRow={10} />
      <strong>ORM's</strong>
      <TechContainer tech={sortedTech.ORM} itemsPerRow={10} />
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore quidem placeat fugiat eveniet ratione earum natus, nostrum assumenda ipsa ab porro tempore veniam aliquam voluptate vitae quasi? Nisi, praesentium nemo?</p>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos commodi corporis aperiam autem et consequatur magni sint rem illum repellat, reprehenderit, quia dolore, voluptate at beatae deserunt? Autem, quisquam id sit necessitatibus magnam impedit earum, ipsa quidem voluptate eligendi deleniti.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, aperiam!</p>
    </div>
  )
}

export default Skills;