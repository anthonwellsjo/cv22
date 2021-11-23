import React from 'react';
import { useViewport } from '../Misc/ViewPort';

interface props {
  project: WorkDocument.RootObject
}

const WorkPage: React.FC<props> = ({ project }) => {
  const { width, height } = useViewport();

  return (
    <div id={project._id} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "100px" }}>
      <h2 style={{ textAlign: "center", fontFamily: "Handwriting", fontSize: "10em" }}>{project.title}</h2>
      <div style={{ height: "2px", width: "250px", backgroundColor: "black", marginTop: "-100px", marginBottom: "100px" }} />
      {project.description.map((b, i) => {
        if (b.style == "h2") return React.createElement("h3", { key: b._key, style: { textAlign: "center" } }, b.children[0].text);
        if (b.style == "normal") return React.createElement("p", { key: b._key }, b.children[0].text);
      })}
      {project.videoDesktop ? <div style={{ display: "flex", justifyContent: "center", marginTop: "150px", marginBottom: "50px" }}>
        <img src="./computerFrame.svg" style={{ position: "absolute", width: `${width! / 4 * 3}px`, maxWidth: "800px", marginTop: "-100px" }} alt="screen" />
        <div style={{ position: "relative", width: "100%", marginTop: "-75px", display: "flex", justifyContent: "center", marginBottom: "100px", }}>
          <a rel="noreferrer" href={project.deployUrl ? project.deployUrl : undefined} target="_blank">
            <div style={{ width: `${(width! / 4 * 3) - (width! / 18 * 3)}px`, maxWidth: "620px" }}>
              <video muted width={"100%"} height="auto" autoPlay playsInline loop>
                <source src={project.videoDesktop.asset.url} type="video/mp4" />
              </video>
              {/* <div style={{ position: "absolute", backgroundColor: project.projectColor, top: 0, height: "16%", width: "80%" }} />*/}
              <div style={{ position: "absolute", bottom: "-25px", height: "30px", backgroundColor: "black", width: "100%" }} />
              <div style={{ position: "absolute", top: "-10px", height: "10px", backgroundColor: "black", width: "100%" }} />
            </div>
          </a>
        </div>
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