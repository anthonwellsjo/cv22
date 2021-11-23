import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useViewport } from './ViewPort';
import BorderAnim from './BorderAnimations/BorderAnim';

interface props {
  item: WorkDocument.RootObject,
  index: number,
  totalItems: number,
  selected: boolean,
  onClick: (item: WorkDocument.RootObject) => void
}

const WorkItem: React.FC<props> = ({ item, index, totalItems, selected, onClick }) => {
  const [hover, setHover] = useState(false);
  const [scroll, setScroll] = useState(0);
  const scrollRef = useRef(scroll);
  const { width, height } = useViewport();



  useEffect(() => {
    let scroller: NodeJS.Timer | undefined = undefined;
    clearInterval(scroller);


    if (hover) {
      if (scrollRef.current < 100) {
        console.log("true", scrollRef.current);
        scroller = setInterval(() => {
          setScrollExpanded(5);
        }, 50)
      } else {
        if (scroller != undefined) {
          // clearInterval(scroller);
        }
      }
    }
    if (!hover) {
      if (scrollRef.current > 0) {
        scroller = setInterval(() => {
          setScrollExpanded(-5);
        }, 50)
      }
    } else {
      if (scroller != undefined) {
        // clearInterval(scroller);
      }
    }

    const setScrollExpanded = (amount: number) => {
      if (amount > 0 && scrollRef.current < 100 || amount < 0 && scrollRef.current > 0) {
        setScroll(prev => (prev + amount));
        scrollRef.current = scrollRef.current + amount;
      } else {
        if (scroller != undefined) {
          clearInterval(scroller);
        }
      }
    }

    return () => {
      if (scroller != undefined) {
        clearInterval(scroller);
      }
    }


  }, [hover])


  return (
    <div style={{
      transition: "all .3s",
      position: "absolute",
      zIndex: 2,
      display: "flex",
      justifyContent: "center",
      alignItems: "end",
      cursor: "pointer",
      marginTop: `${index * 180}px`,
      left: "-222px",
      height: "170px"
    }}>
      <div
        onMouseEnter={() => { setHover(true) }}
        onMouseLeave={() => { setHover(false) }}
        onClick={e => { onClick(item) }}
        style={{
          position: "relative",
          transition: "all .3s",
          transform: `translateX(${hover || selected ? 220 : 0}px)`,
          backgroundColor: item.projectColor,
          width: "230px",
          outline: "1px solid black",
          height: "170px",
          display: "flex",
          alignItems: "end"
        }} >
        <div style={{
          position: "absolute",
          bottom: "10%",
          fontSize: "12px",
          textAlign: "justify",
          padding: "1px 3px",
          width: "70%",
          marginLeft: "10px"
        }}>
          {item.tech.map((t, i) => <span style={{
            lineHeight: "15px",
            lineBreak: "anywhere",
            backgroundColor: "black",
            color: "white",
            marginRight: "2px",
            padding: "1px 4px",
          }} key={t._id}>{t.title}</span>)}
        </div>
        <div
          style={{
            transition: "all .2s",
            height: "50px",
            width: "50px",
            fontFamily: "Handwriting",
            fontSize: "30px",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            position: "absolute",
            right: "-80px",
            top: "20%",
            transform: `${hover || selected ? "rotate(90deg) translate(-30px, 50px)" : "rotate(90deg) translate(-30px, -5px)"}`
          }}>
          <h3>{item.title}</h3>
        </div>
      </div>
    </div >
  )
}

export default WorkItem;