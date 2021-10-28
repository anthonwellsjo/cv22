import React from 'react';
import { useTransition, animated } from '@react-spring/web'
import Image from 'next/image';


interface props {
  tech: Tech[],
  onFinishedAnimation?: () => void,
  itemsPerRow: number,
  itemSize: number
}


const TechContainer = ({ tech, onFinishedAnimation, itemsPerRow, itemSize }: props) => {



  const transitions = useTransition(tech, {
    from: { opacity: 0, transform: "scale(0)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0)" },
    config: { mass: 1, tension: 200 },

  })


  return (
    <div
      onClick={e => { e.stopPropagation() }}
      style={{
        display: "grid",
        height: `${Math.ceil(tech.length / itemsPerRow) * 60}px`,
        
        gridColumnGap: "10px",
        gridRowGap: "10px",
        gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`,
        gridTemplateRows: `repeat(${Math.ceil(tech.length / itemsPerRow)}, 1fr)`,
        padding: "10px",
      }
      }>
      {transitions(({ opacity, transform }, tech) => (
        <animated.div
          onClick={e => { e.stopPropagation(); }}
          style={{
            opacity: opacity.to(y => y),
            transform: transform.to(z => z),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
                data-linkPath={tech.link}
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
      ))}
    </div >
  )
}

export default TechContainer;