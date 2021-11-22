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
        <div style={{ position: "relative", top: "5%", width: "80%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            {work.map(w => {
                return (
                    <WorkItem key={w._id} item={w} />
                )
            })}
        </div>
    )
}

export default WorkDesktop;