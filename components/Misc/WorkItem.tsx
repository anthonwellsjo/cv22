import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useViewport } from './ViewPort';
import BorderAnim from './BorderAnimations/BorderAnim';

interface props {
    item: WorkDocument.RootObject
}

const WorkItem: React.FC<props> = ({ item }) => {
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
            position: "relative",
            zIndex: 2,
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
            width: "100%",
            height: `${80}px`,
            marginBottom: "-30px",
            top: "-50px",
            opacity: hover ? 1 : 0.5,
        }}>
            <div
                onMouseEnter={() => { setHover(true) }}
                onMouseLeave={() => { setHover(false) }}
                style={{
                    position: "relative",
                    transition: "all .3s",
                    left: "50%",
                    transform: `translate(-50%, ${hover ? -250 : -100}px)`,
                    backgroundColor: item.projectColor,
                    width: "100%",
                    outline: "1px solid black",
                    height: `${height! * 0.6}px`
                }} >
                <h1 style={{ position: "absolute", left: "5px", top: "-8px" }}>{item.title}</h1>
                {item.tech.map((t, i) => <span style={{marginTop:"25px"}} key={t._id}>{t.title}, </span>)}
            </div>
        </div>
    )
}

export default WorkItem;