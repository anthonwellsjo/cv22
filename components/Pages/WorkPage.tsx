import React, { useEffect, useState } from 'react';
import BorderAnimAuto from '../Misc/BorderAnimations/BorderAnimAuto';
import TechContainer from '../Misc/techContainer/TechContainer';
import { useViewport } from '../Misc/ViewPort';
import { getTechItemSize, getTechItemsPerRow } from '../utils/utils';

interface props {
  project: WorkDocument.RootObject,
  tech: Tech[],
  scroll: number
}


const WorkPage: React.FC<props> = ({ project, tech, scroll }) => {
  const { width, height } = useViewport();
  const [showTech, setShowTech] = useState<Tech[]>([]);

  useEffect(() => {
    const ids = project.tech.map(t => t._id);
    setShowTech(tech.filter(t => {
      return ids.includes(t._id);
    }));
  }, [tech, project.tech])

  const getVideoMarginTop = () => {
    return width! < 356 ? `${-width! / 0.4 / 40}px` : width! < 486 ? `${-width! / 0.4 / 50}px` : width! < 732 ? `${-width! / 0.4 / 80}px` : "auto"
  }
  const getTopMallMarginTop = () => {
    return width! < 356 ? `${-width! / 0.4 / 60}px` : width! < 486 ? `${-width! / 0.4 / 80}px` : width! < 732 ? `${-width! / 0.4 / 100}px` : "auto"
  }
  const getBottomMallMarginTop = () => {
    return width! < 356 ? `${-width! / 0.4 / 60}px` : width! < 486 ? `${-width! / 0.4 / 10}px` : width! < 732 ? `${-width! / 0.4 / 100}px` : "auto"
  }

  return (
    <div id={project._id} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "100px", backgroundColor: project.projectColor, padding: "40px", borderRadius: "10px", boxShadow: "1px -3px 80px lightgrey" }}>
      <h2 style={{ textAlign: "center", fontFamily: "Handwriting", fontSize: "10vw" }}>{project.title}</h2>
      <div style={{ position: "relative", marginTop: width! < 450 ? "-150px" : "-250px", width: "100%", height: "500px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <BorderAnimAuto >
          <TechContainer itemSize={getTechItemSize(width!)} tech={showTech} itemsPerRow={getTechItemsPerRow(width!)} />
        </BorderAnimAuto>
      </div>
      {project.description.map((b, i) => {
        if (b.style == "h2") return React.createElement("h3", { key: b._key, style: { textAlign: "center" } }, b.children[0].text);
        if (b.style == "normal") return React.createElement("p", { key: b._key }, b.children[0].text);
      })}
      {project.videoDesktop ? <div style={{ display: "flex", justifyContent: "center", marginTop: "150px", marginBottom: "50px" }}>
        <div style={{ position: "relative", width: "100%", marginTop: "-75px", display: "flex", justifyContent: "center", marginBottom: "100px", }}>
          <a rel="noreferrer" href={project.deployUrl ? project.deployUrl : undefined} target="_blank">
            <div style={{ width: `${(width! / 4 * 3) - (width! / 18 * 3)}px`, marginTop: getVideoMarginTop(), maxWidth: "620px" }}>
              <video muted width={"100%"} height="auto" autoPlay playsInline loop>
                <source src={project.videoDesktop.asset.url} type="video/mp4" />
              </video>
              {/* <div style={{ position: "absolute", backgroundColor: project.projectColor, top: 0, height: "16%", width: "80%" }} />*/}
              <div style={{ position: "absolute", marginTop: getBottomMallMarginTop(), bottom: "-25px", height: "30px", backgroundColor: "black", width: "100%" }} />
              <div style={{ position: "absolute", marginTop: getTopMallMarginTop(), top: "-10px", height: "10px", backgroundColor: "black", width: "100%" }} />
            </div>
          </a>
        </div>
        <img src="./computerFrame.svg" style={{ position: "absolute", width: `${width! / 4 * 3}px`, maxWidth: "800px", marginTop: "-100px" }} alt="screen" />
      </div> : null}

      {project.videoMobile ? <div style={{ display: "flex", justifyContent: "center", marginTop: "80px", }}>
        <img src="../../mobileFrame.svg" style={{ position: "absolute", width: `${width! / 3.5}px`, maxWidth: "290px", marginTop: "0px" }} alt="screen" />
        <div style={{ position: "relative", width: "100%", marginTop: "25px", display: "flex", justifyContent: "center" }}>
          <a rel="noreferrer" href={project.deployUrl ? project.deployUrl : undefined} target="_blank">
            <div style={{ width: `${width! / 3.9}px`, maxWidth: "265px", borderRadius: "15px", overflow: "hidden" }}>
              <video muted width={"100%"} height="auto" autoPlay playsInline loop>
                <source src={project.videoMobile.asset.url} type="video/mp4" />
              </video>
              {/* <div style={{ position: "absolute", backgroundColor: project.projectColor, top: 0, height: "16%", width: "80%", maxWidth: "350px" }} />
                <div style={{ position: "absolute", backgroundColor: project.projectColor, bottom: 0, height: "12%", width: "80%", maxWidth: "350px" }} /> */}
            </div>
          </a>
        </div>
      </div> : null}
      {project.githubRepositoryLink ?
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "150px" }}>
          <a className="buttidybuttbutt" onClick={(e) => { e.stopPropagation() }} href={project.githubRepositoryLink} rel="noreferrer" target="_blank" >
            Go to github repo
          </a>
        </div>
        : null}
      {project.deployUrl ?
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <a className="buttidybuttbutt" onClick={e => e.stopPropagation()} target="_blank" rel="noreferrer" href={project.deployUrl}>
            Go to live build </a>
        </div> : null}
      <div style={{ height: "1px", width: "20px", backgroundColor: "black", marginTop: "100px", marginBottom: "100px" }} />
    </div>
  )
}

export default WorkPage;