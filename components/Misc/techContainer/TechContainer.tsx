import React, { useState } from 'react';
import { useTransition, animated } from '@react-spring/web'
import Image from 'next/image';
import { useRouter } from 'next/router'


interface props {
  tech: Tech[],
  onFinishedAnimation?: () => void,
  itemsPerRow: number,
  itemSize: number
}


const TechContainer = ({ tech, onFinishedAnimation, itemsPerRow, itemSize }: props) => {
  const [hoveredTech, setHoveredTech] = useState("");
  const router = useRouter();

  const transitions = useTransition(tech, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })


  return (
    <div
      style={{
        display: "grid",
        gridColumnGap: "10px",
        gridRowGap: "10px",
        gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`,
        gridTemplateRows: `repeat(${Math.ceil(tech.length / itemsPerRow)}, 1fr)`,
        padding: "10px",
      }
      }>
      {transitions(({ opacity }, tech) => (
          <animated.div
            onClick={() => { router.push(tech.link) }}
            onMouseEnter={() => { setHoveredTech(tech._id); }}
            onMouseLeave={() => { setHoveredTech(""); }}
            style={{
              opacity: opacity.to(z => z),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all .2s",
              height: "80%"
            }}>
            <div
              style={{
                width: `${itemSize}px`,
                height: `${itemSize}px`,
                display: "inline",
                cursor: "pointer"
              }}>
              {/* <p style={{ textAlign: "center", fontFamily: "Martel", fontWeight: 800, fontSize: "1.8em", marginTop: "2px" }}>{tech.techlogo.asset.url}</p> */}
              {tech.techlogo?.asset?.url ?
                <Image
                  alt={tech.title}
                  onClick={() => { console.log("clicked") }}
                  // data-linkPath={tech.link}
                  data-description={tech.description}
                  data-title={tech.title}
                  width={itemSize}
                  height={itemSize}
                  objectFit="scale-down"
                  src={tech.techlogo.asset.url}
                />
                :
                <p style={{ fontSize: ".8em", textAlign: "center" }}>{tech.title}</p>
              }
            </div>
          </animated.div>
      ))
      }
    </div >
  )
}

export default TechContainer;
