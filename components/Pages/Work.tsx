import React, { createRef, LegacyRef, useEffect, useMemo, useState } from 'react';
import { useViewport } from '../Misc/ViewPort';
import WorkItem from '../Misc/WorkItem';
import Scroller from './Scroller';
import { thresHolds } from '../utils/app-config';
import WorkPage from './WorkPage';
import TechContainer from '../Misc/techContainer/TechContainer';
import FadeIn from '../Misc/FadeIn';
import { getPercentageOfZone } from '../utils/scroll-helpers';

interface props {
  work: WorkDocument.RootObject[],
  scroll: number,
  setScroll: (scroll: number) => void,
  tech: Tech[]
}

const Work: React.FC<props> = ({ work, scroll, setScroll, tech }) => {
  const [currentProject, setCurrentProject] = useState(work[2]);
  const [divHeight, setDivHeight] = useState<undefined | number>(undefined)
  const projectThresholds = useMemo(() => work.map((w, i) => [100 / work.length * i, 100 / work.length * i + 100 / work.length, w._id]), [])

  let divRef: LegacyRef<HTMLDivElement> | null = useMemo(() => createRef(), [])

  const { width, height } = useViewport();

  const onWorkItemClickedEventHandler = (item: WorkDocument.RootObject) => {
    console.log(divRef);
    setCurrentProject(item);
    const amount = (thresHolds[3] - thresHolds[2]) / work.length * work.findIndex(w => w._id === item._id);
    console.log("amount", amount);
    setScroll(thresHolds[2] + 0.1 + amount);
  }

  useEffect(() => {
    if (divRef != null) {
      setDivHeight((divRef as any).current.clientHeight);
    }
  }, [divRef])

  const setCurrentActiveProject = (percentageOfZone: number) => {
    const index = projectThresholds.findIndex(t => percentageOfZone < t[1] && percentageOfZone > t[0]);
    if (currentProject._id !== work[index]._id) {
      setCurrentProject(work[index]);
    }
  }

  useEffect(() => {
    const percentageOfZone = getPercentageOfZone([thresHolds[2], thresHolds[3]], scroll);
    setCurrentActiveProject(percentageOfZone);
  }, [scroll])


  return (
    <div style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", justifyContent: "center" }}>
      <Scroller scroll={scroll} divHeight={divHeight != null ? `${divHeight}px` : `${200 * TechContainer.length}vh`} zone={[thresHolds[2] - 0.43, thresHolds[3]]}>
        <div ref={divRef} style={{
          paddingTop: "200vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "80%"
        }}>
          {width! < 1400 && height! < 1300 && <div style={{ height: `${height! / 0.9}px` }} />}
          {width! > 1400 && height! < 1000 && <div style={{ height: `${height! / 0.9}px` }} />}
          {work.map(w => <WorkPage scroll={scroll} tech={tech} key={w._id} project={w} />)}
          <div style={{ height: "1500px" }} />
        </div>
      </Scroller>

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