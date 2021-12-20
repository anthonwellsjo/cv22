import React, { useEffect, useState } from 'react';
import { MediaPort } from '../../enums';
import BorderAnimAuto from '../Misc/BorderAnimations/BorderAnimAuto';
import GetMediaPort from '../Misc/GetMediaPort';
import TechContainer from '../Misc/techContainer/TechContainer';
import { useViewport } from '../Misc/ViewPort';
import { getTechItemSize, getTechItemsPerRow } from '../utils/utils';
import Image from 'next/image';

interface props {
  project: WorkDocument.RootObject,
  tech: Tech[],
  scroll: number,

}


const WorkPage: React.FC<props> = ({ project, tech, scroll }) => {
  const { width, height } = useViewport();
  const isMobile = GetMediaPort({ width, height }) === MediaPort.mobile;
  const [showTech, setShowTech] = useState<Tech[]>([]);

  useEffect(() => {
    const ids = project.tech.map(t => t._id);
    setShowTech(tech.filter(t => {
      return ids.includes(t._id);
    }));
  }, [tech, project.tech])

  const getVideoMarginTop = () => {
    return "59px"
  }


  const backgroundColor = project.projectColor + "80";

  return (
    <div id={project._id} style={{ position: "relative", display: "flex", width: "100%", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "100px", backgroundColor: backgroundColor, padding: "40px", borderRadius: "10px", boxShadow: "1px -3px 80px lightgrey" }}>
      <h2 style={{ textAlign: "center", fontFamily: "Handwriting", fontSize: "10vw", marginBottom: isMobile ? "0px" : "100px" }}>{project.title}</h2>
      <div style={{ position: "relative", marginTop: width! <= 640 ? "-150px" : "-250px", width: "100%", height: "500px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <BorderAnimAuto mobile={isMobile}>
          <TechContainer itemSize={getTechItemSize(width!)} tech={showTech} itemsPerRow={getTechItemsPerRow(width!)} />
        </BorderAnimAuto>
      </div>
      {project.description.map((b, i) => {
        console.log(project);
        if (b.style == "h2") return React.createElement("h3", { key: b._key, style: { textAlign: "center" } }, b.children[0].text);
        if (b.style == "normal") return React.createElement("p", { key: b._key }, b.children[0].text);
        if (b._type == "image") {
          const image = b as WorkDocument.ImageDescription;
          return <Image width={image.asset.metadata.dimensions.width} height={image.asset.metadata.dimensions.height} layout="intrinsic" src={image.asset.url} alt="artefact" />
        }
      })}
      {project.videoDesktop ? <div style={{ display: "flex", justifyContent: "center", marginTop: "150px", marginBottom: "50px" }}>
        <div style={{ position: "relative", left: "50%", transform: "translateX(-50%)", width: "50%", marginTop: "-75px", display: "flex", justifyContent: "center", marginBottom: "100px", }}>
          <a rel="noreferrer" href={project.deployUrl ? project.deployUrl : undefined} target="_blank">
            <div style={{ width: `${(width! / 4 * 3) - (width! / 18 * 3)}px`, marginTop: getVideoMarginTop(), minWidth: "300px", maxWidth: "620px" }}>
              <video muted width={"100%"} height="auto" autoPlay playsInline loop>
                <source src={project.videoDesktop.asset.url} type="video/mp4" />
              </video>
              {width! > 1058 && <div style={{ position: "absolute", backgroundColor: "black", top: "35px", height: "2vw", width: `${width! / 4 * 2.15}px`, minWidth: "605px", maxWidth: "630px" }} />}
              {width! < 552 && <div style={{ position: "absolute", backgroundColor: "black", bottom: "-5px", height: "2vw", width: `${width! / 4 * 2.15}px`, minWidth: "305px", maxWidth: "630px" }} />}
            </div>
          </a>
        </div>
        <div style={{ position: "relative", right: "50%", transform: "translateX(50%)", zIndex: 2, width: `${width! / 4 * 3}px`, minWidth: "380px", maxWidth: "800px", marginTop: "-100px" }}>
          <Image layout={"fill"} src="/computerFrame.svg" alt="desktop screen frame" />
        </div>
      </div> : null}

      {project.videoMobile ? <div style={{ display: "flex", justifyContent: "center", }}>
        <div style={{ position: "relative", left: "50%", transform: "translateX(-50%)", zIndex: 2, width: `${(width! / 4) + 8000 / width!}px`, minWidth: "170px", maxWidth: "350px", marginTop: "-100px" }}>
          <Image layout={"fill"} src="/mobileFrame.svg" alt="desktop screen frame" />
        </div>
        <div style={{ position: "relative", zIndex: 2, right: "50%", transform: "translateX(50%)", width: "50%", marginTop: "-55px", display: "flex", justifyContent: "center", marginBottom: "100px", }}>
          <a rel="noreferrer" href={project.deployUrl ? project.deployUrl : undefined} target="_blank">
            <div style={{ width: `${(width! / 4)}px`, minWidth: "150px", borderRadius: `${width! / 100}px`, overflow: "hidden", marginTop: getVideoMarginTop(), maxWidth: "320px" }}>
              <video muted width={"100%"} height="auto" autoPlay playsInline loop>
                <source src={project.videoMobile.asset.url} type="video/mp4" />
              </video>
            </div>
          </a>
        </div>

      </div> : null}
      <div style={{ width: "40px", height: "1px", backgroundColor: "grey", marginTop: "40px" }} />
      <div style={{ marginTop: "50px", marginBottom: "30px" }}>
        <svg stroke="currentColor" fill="grey" strokeWidth="0" viewBox="0 0 512 512" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M247 21.074c0 10.508 7.18 18.167 14.71 23.412 7.532 5.246 16.41 9.202 24.698 13.15 8.287 3.95 15.954 7.94 20.332 11.657 4.378 3.717 5.225 5.25 4.46 8.82-.497 2.315-1.215 3.316-2.612 4.46-1.397 1.146-3.766 2.287-7.15 3.107-6.77 1.64-17.084 1.778-27.94 1.722-10.856-.055-22.27-.272-32.76 1.975-10.49 2.246-21.296 8.173-25.252 19.7-2.59 7.548-.236 15.34 3.37 20.804 3.605 5.464 8.328 9.71 12.857 13.696 2.997 2.638 5.89 5.126 8.355 7.424h22.875c-1.575-3.354-3.862-6.223-6.168-8.754-4.138-4.544-8.918-8.44-13.17-12.182-4.25-3.74-7.917-7.357-9.726-10.1-1.81-2.74-1.9-3.496-1.368-5.044 1.518-4.425 4.565-6.35 11.996-7.94 7.43-1.593 18.006-1.633 28.898-1.578 10.892.056 22.087.24 32.27-2.228 5.09-1.234 10.058-3.184 14.322-6.678 4.264-3.494 7.53-8.68 8.8-14.61 2.275-10.606-3.357-20.327-10.41-26.314-7.052-5.987-15.765-10.15-24.238-14.185-8.472-4.037-16.733-7.896-22.152-11.67-5.42-3.775-6.998-6.34-6.998-8.643h-18zM41 169v174h430V169H41zm7 14h16v18H48v-18zm32 0h16v18H80v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm48 0h48v18h-48v-18zm96 0h32v18h-32v-18zM48 215h32v18H48v-18zm48 0h16v18H96v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h32v18h-32v-18zm48 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm-127.87 25h18v57h-25v-18h7v-39zM48 247h16v18H48v-18zm32 0h16v18H80v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm96 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm-96 16h16v18h-16v-18zM48 279h32v18H48v-18zm48 0h16v18H96v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm112 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zM48 311h16v18H48v-18zm32 0h16v18H80v-18zm32 0h144v18H112v-18zm160 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h48v18h-48v-18zm64 0h16v18h-16v-18z"></path></svg>
      </div>
      {project.githubRepositoryLink ?
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", }}>
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

    </div>
  )
}

export default WorkPage;