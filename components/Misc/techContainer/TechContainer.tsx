import React, { useContext, useEffect, useState } from 'react';
import { useTransition, animated, useSpring } from '@react-spring/web'


interface props {
  tech: Tech[],
  onFinishedAnimation?: () => void,
  itemsPerRow: number
}


const TechContainer = ({ tech, onFinishedAnimation, itemsPerRow }: props) => {
  const [items, setItems] = useState<Tech[]>([]);

  let x = 0;
  const [sound, setSound] = useState(0.1);

  useEffect(() => {
    let interval = setInterval(() => {
      if (tech[x] !== undefined) {
        setItems(prev => ([...prev, tech[x]]));
        x++;
      } else {
        clearInterval(interval);
      }
      if (tech.length - 1 === x) {
        if (onFinishedAnimation != null) {
          onFinishedAnimation();
        }
      }
    }, 100);

    return () => {
      clearInterval(interval)
    };
  }, [tech])



  const transitions = useTransition(items, {
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
        maxWidth: "80%",

        width: "auto",
        gridColumnGap: "10px",
        gridRowGap: "10px",
        gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`,
        gridTemplateRows: `repeat(${Math.ceil(tech.length / itemsPerRow)}, 1fr)`,
        padding: "10px",
      }
      }>
      {transitions(({ opacity, transform }, items) => (
        <animated.div
          onClick={e => { e.stopPropagation(); }}
          style={{
            opacity: opacity.to(y => y),
            transform: transform.to(z => z),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50px",
            height: "50px"
          }}>
          <div
            style={{
              width: "50px",
              display: "inline",
              cursor: "pointer"
            }}>
            {/* <p style={{ textAlign: "center", fontFamily: "Martel", fontWeight: 800, fontSize: "1.8em", marginTop: "2px" }}>{items.techlogo.asset.url}</p> */}
            <img onClick={() => { console.log("clicked") }} data-linkPath={items.link} data-description={items.description} data-title={items.title} src={items.techlogo != null ? `${items.techlogo.asset.url}?h=50` : undefined} style={{ width: "50px" }} />
          </div>
        </animated.div>
      ))}
    </div >
  )
}

export default TechContainer;