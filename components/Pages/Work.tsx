import React, { createRef, LegacyRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useViewport } from '../Misc/ViewPort';
import WorkScroller from '../Misc/WorkItem';
import WorkItem from '../Misc/WorkItem';
import Scroller from './Scroller';
import { thresHolds } from '../utils/app-config';

interface props {
  work: WorkDocument.RootObject[],
  scroll: number
}

const WorkDesktop: React.FC<props> = ({ work, scroll }) => {
  const { width, height } = useViewport();
  const [currentProject, setCurrentProject] = useState(work[0]);
  const [divHeight, setDivHeight] = useState<undefined | number>(undefined)
  let divRef: LegacyRef<HTMLDivElement> | null = createRef();

  const onWorkItemClickedEventHandler = (item: WorkDocument.RootObject) => {
    setCurrentProject(item);
  }

  useEffect(() => {
    if (divRef != null) {
      setDivHeight(divRef.current.clientHeight);
    }

  }, [divRef])


  return (
    <body style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Scroller scroll={scroll} divHeight={divHeight != null ? `${divHeight * 1.3}px` : undefined} zone={[thresHolds[2] - 0.43, thresHolds[3]]}>
        <div ref={divRef} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop:"100px", width:"80%" }}>
          <h2 style={{fontFamily:"Handwriting", fontSize:"4em"}}>{currentProject.title}</h2>
          {currentProject.description.map((b, i) => {
            if (b.style == "h2") return React.createElement("h3", { key: b._key, style: { textAlign: "center" } }, b.children[0].text);
            if (b.style == "normal") return React.createElement("p", { key: b._key }, b.children[0].text);
          })}
          {currentProject.videoDesktop ? <div style={{ display: "flex", justifyContent: "center", marginTop: "150px", marginBottom: "50px" }}>
            <img src="./computerFrame.svg" style={{ position: "absolute", width: `${width! / 4 * 3}px`, maxWidth: "800px", marginTop: "-100px" }} alt="screen" />
            <div style={{ position: "relative", width: "100%", marginTop: "-75px", display: "flex", justifyContent: "center", marginBottom: "100px", }}>
              <a rel="noreferrer" href={currentProject.deployUrl ? currentProject.deployUrl : undefined} target="_blank">
                <div style={{ width: `${(width! / 4 * 3) - (width! / 18 * 3)}px`, maxWidth: "620px" }}>
                  <video muted width={"100%"} height="auto" autoPlay playsInline loop>
                    <source src={currentProject.videoDesktop.asset.url} type="video/mp4" />
                  </video>
                  {/* <div style={{ position: "absolute", backgroundColor: currentProject.projectColor, top: 0, height: "16%", width: "80%" }} />*/}
                  <div style={{ position: "absolute", bottom: "-25px", height: "30px", backgroundColor: "black", width: "100%" }} />
                  <div style={{ position: "absolute", top: "-10px", height: "10px", backgroundColor: "black", width: "100%" }} />
                </div>
              </a>
            </div>
          </div> : null}

          {currentProject.videoMobile ? <div style={{ display: "flex", justifyContent: "center", marginTop: "80px", }}>
            <img src="../../mobileFrame.svg" style={{ position: "absolute", width: `${width! / 3.5}px`, maxWidth: "290px", marginTop: "0px" }} alt="screen" />
            <div style={{ position: "relative", width: "100%", marginTop: "25px", display: "flex", justifyContent: "center" }}>
              <a rel="noreferrer" href={currentProject.deployUrl ? currentProject.deployUrl : undefined} target="_blank">
                <div style={{ width: `${width! / 3.9}px`, maxWidth: "265px", borderRadius: "15px", overflow: "hidden" }}>
                  <video muted width={"100%"} height="auto" autoPlay playsInline loop>
                    <source src={currentProject.videoMobile.asset.url} type="video/mp4" />
                  </video>
                  {/* <div style={{ position: "absolute", backgroundColor: currentProject.projectColor, top: 0, height: "16%", width: "80%", maxWidth: "350px" }} />
                <div style={{ position: "absolute", backgroundColor: currentProject.projectColor, bottom: 0, height: "12%", width: "80%", maxWidth: "350px" }} /> */}
                </div>
              </a>
            </div>
          </div> : null}
          {currentProject.githubRepositoryLink ?
            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "150px" }}>
              <a className="buttidybuttbutt" onClick={(e) => { e.stopPropagation() }} href={currentProject.githubRepositoryLink} rel="noreferrer" target="_blank" >
                Go to github repo
              </a>
            </div>
            : null}
          {currentProject.deployUrl ?
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <a className="buttidybuttbutt" onClick={e => e.stopPropagation()} target="_blank" rel="noreferrer" href={currentProject.deployUrl}>
                Go to live build </a>
            </div> : null}
        </div>
      </Scroller>

      <div style={{
        position: "fixed",
        left:"0",
        top:"20%",
        display: "flex",
        justifyContent: "center",
        backgroundColor:"blue",
      }}>
        {work.map((w, i) => {
          return (
            <WorkItem key={w._id} item={w} index={i} totalItems={work.length} onClick={onWorkItemClickedEventHandler} selected={currentProject._id === w._id} />
          )
        })}
      </div>
    </body>
  )
}

export default WorkDesktop;