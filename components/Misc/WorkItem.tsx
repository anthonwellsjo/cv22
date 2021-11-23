import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useViewport } from './ViewPort';
import BorderAnim from './BorderAnimations/BorderAnim';

interface props {
    item: WorkDocument.RootObject,
    index: number
}

const WorkItem: React.FC<props> = ({ item, index }) => {
    const [hover, setHover] = useState(false);
    const [scroll, setScroll] = useState(0);
    const scrollRef = useRef(scroll);



    useEffect(() => {
        let scroller: NodeJS.Timer | undefined = undefined;
        clearInterval(scroller);
        console.log("hover", hover, scrollRef.current);


        if (hover) {
            console.log("true", scrollRef.current);
            if (scrollRef.current < 100) {
                console.log("true", scrollRef.current);
                scroller = setInterval(() => {
                    setScrollExpanded(5);
                    console.log("scrolling", scrollRef.current);
                }, 50)
            } else {
                if (scroller != undefined) {
                    console.log("deleting");
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

    console.log("work item", item);

    const { width, height } = useViewport();
    return (
        <div style={{
            transition: "all .3s",
            position: "absolute",
            zIndex: 2,
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
            marginLeft: `${index * 250}px`,
            top: "-40px",
            opacity: hover ? 1 : 0.8,
            backgroundColor:"red"
        }}>
            <div
                onMouseEnter={() => { setHover(true) }}
                onMouseLeave={() => { setHover(false) }}
                style={{
                    position: "relative",
                    transition: "all .3s",
                    transform: `translateY(${hover ? -90 : 0}px)`,
                    backgroundColor: item.projectColor,
                    width: "50vw",
                    outline: "1px solid black",
                    height: `${height! * 0.6}px`,
                }} >
                <h3 style={{ position: "absolute", left: "5px", top: "-30px", fontFamily: "Handwriting", fontSize: "33px", padding: "0 5px" }}>{item.title}</h3>
                <div style={{ position: "absolute", left: "5px", top: "40px", fontSize: "12px", padding: "1px 3px" }}>
                    {item.tech.map((t, i) => <span style={{ backgroundColor: "black", color: "white", marginRight: "2px", padding: "1px 4px" }} key={t._id}>{t.title}</span>)}
                </div>
            </div>
        </div>
    )
}

export default WorkItem;