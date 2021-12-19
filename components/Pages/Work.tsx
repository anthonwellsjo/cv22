import React, { createRef, LegacyRef, useEffect, useMemo, useState } from 'react';
import { useViewport } from '../Misc/ViewPort';
import WorkItem from '../Misc/WorkItem';
import Scroller from './Scroller';
import { thresHolds } from '../utils/app-config';
import WorkPage from './WorkPage';
import TechContainer from '../Misc/techContainer/TechContainer';
import FadeIn from '../Misc/FadeIn';
import { getPercentageOfZone } from '../utils/scroll-helpers';
import GetMediaPort from '../Misc/GetMediaPort';
import { MediaPort } from '../../enums';

interface props {
  work: WorkDocument.RootObject[],
  scroll: number,
  setScroll: (scroll: number) => void,
  tech: Tech[],
  scroller: (scroll: number) => void
}

const Work: React.FC<props> = ({ work, scroll, setScroll, tech, scroller }) => {
  const [currentProject, setCurrentProject] = useState(work[2]);
  const projectThresholds = useMemo(() => work.map((w, i) => [100 / work.length * i, 100 / work.length * i + 100 / work.length, w._id]), [])

  const divRef: React.LegacyRef<HTMLDivElement> | undefined = createRef()



  const { width, height } = useViewport();
  const isMobile = GetMediaPort({ width, height }) === MediaPort.mobile;

  const setCurrentActiveProject = (percentageOfZone: number) => {
    const index = projectThresholds.findIndex(t => percentageOfZone < t[1] && percentageOfZone > t[0]);
    if (currentProject._id !== work[index]._id) {
      setCurrentProject(work[index]);
    }
  }

  const onScrollEventHandler: React.UIEventHandler<HTMLDivElement> = (e) => {
    console.log(e.currentTarget.scrollTop, e.currentTarget.clientHeight, e.currentTarget.scrollHeight);
    const scroll = thresHolds[2] + 0.01 + ((e.currentTarget.scrollTop) / (e.currentTarget.scrollHeight - e.currentTarget.clientHeight)) * 4.999;
    setScroll(scroll);
    // const percentageOfZone = getPercentageOfZone([thresHolds[2], thresHolds[3]], scroll);
    // setCurrentActiveProject(percentageOfZone);
  }

  useEffect(() => {
    if (scroll > (thresHolds[2] + 3)) {
      if (divRef.current != null) {
        divRef.current.scrollTop = divRef.current.scrollHeight - divRef.current.clientHeight - 200;
      }
    }
  }, [])

  return (
    <div ref={divRef} onScroll={onScrollEventHandler} style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", justifyContent: "center", overflowY: "scroll" }}>
      <div style={{
        position: "relative",
        paddingTop: isMobile ? "4000px" : "5000px",
        paddingBottom: isMobile ? "500vh" : "600vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: isMobile ? "100%" : "80%",
      }}>
        {work.map(w => <WorkPage scroll={scroll} tech={tech} key={w._id} project={w} />)}
        <div style={{ height: "1500px" }} />
      </div>

      <FadeIn>
        <div style={{
          position: "fixed",
          left: "0",
          top: "20%",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "blue",
        }}>
          {/* {work.map((w, i) => {
            return (
              <WorkItem key={w._id} item={w} index={i} totalItems={work.length} onClick={onWorkItemClickedEventHandler} selected={currentProject._id === w._id} />
            )
          })} */}
        </div>
      </FadeIn>
    </div>
  )
}

export default Work;