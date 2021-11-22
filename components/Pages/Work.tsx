import React from 'react';
import Image from 'next/image';
import { useViewport } from '../Misc/ViewPort';
import WorkScroller from '../Misc/WorkItem';
import WorkItem from '../Misc/WorkItem';

interface props {
    work: WorkDocument.RootObject[]
}

const WorkDesktop: React.FC<props> = ({ work }) => {


    return (
        <div style={{
            position: "relative",
            top: "100px",
            width: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",

        }}>
            {work.map(w => {
                return (
                    <WorkItem key={w._id} item={w} />
                )
            })}
            <div
                style={{
                    position: "absolute",
                    top: "0",
                    width: "80vw",
                    height: "80vh",
                    backgroundColor:"white",
                    zIndex:2,
                    borderTop:"2px solid black"
                }}
            ></div>
        </div>
    )
}

export default WorkDesktop;