import { Canvas } from '@react-three/fiber'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { createRef, useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import BlackSheet from '../components/BlackSheet'
import Chapter from '../components/Chapter'
import IndexHolder from '../components/IndexHolder'
import BioPage from '../components/Pages/Bio'
import IntroPage from '../components/Pages/Intro'
import PageWrapper from '../components/Pages/PageWrapper'
import ScrollBar from '../components/ScrollBar'
import { getClosestThreshold, getNewTouchScroll, getScrollPosition, scrollCalculator } from '../components/utils/scroll-helpers'
import { maxScroll, thresHolds } from '../components/utils/app-config'
import Title from '../components/Pages/Title'
import Scroller from '../components/Pages/Scroller'
import Skills from '../components/Pages/Skills'
import AppFrame from '../components/AppFrame'
import BorderAnim from '../components/Misc/BorderAnimations/BorderAnim'
import { useViewport } from '../components/Misc/ViewPort'
import GetMediaPort from '../components/Misc/GetMediaPort'
import { MediaPort } from '../enums'
import { calculatePosition, scrollIsntCloseToAnyThreshold } from '../components/utils/utils'
import FadeIn from '../components/Misc/FadeIn'
import Work from '../components/Pages/Work'
import Social from '../components/Pages/Social'

interface HomeProps {
  builtOn: string,
  tech: Tech[],
  techTypes: string[],
  work: WorkDocument.RootObject[],

}

const Home: NextPage<HomeProps> = ({ builtOn, tech, techTypes, work }) => {
  const [scrollDirection, setScrollDirection] = useState<1 | -1 | null>(null)
  const scrollDirectionRef = useRef(scrollDirection);
  const [scroll, setScroll] = useState(0);
  const scrollRef = useRef(scroll);
  const { width, height } = useViewport();
  // const [autoScrollActivatorTimer, setAutoScrollActivatorTimer] = useState<NodeJS.Timeout | undefined>();
  const [autoSroll, setAutoScroll] = useState<NodeJS.Timer | undefined>();
  let autoScrollActivatorTimer: NodeJS.Timeout;
  let autoScroll: NodeJS.Timer;

  useEffect(()=>{
    
  console.log("%cHey!", 'color: green; background: yellow; font-size: 30px;');
  console.log("%cThis is my personal site and I consider it my code playground to play with new ideas. If you are looking for bad code practices you can stop now, because there are. Lots... ", 'color: black; background: white; font-size: 25px;');
  console.log("%cIf you are looking for code that I consider production level quality, then maybe you would like to checkout some of my other projects here: https://www.github.com/anthonwellsjo", 'color: white; background: black; font-size: 20px;');
  }, [])
    
    
    
  useEffect(() => {
    autoScrollActivatorTimer = setTimeout(() => {
      autoScroll = setInterval(() => {
        autoScrollYep();
      }, 50)
    }, 500);

    return () => {
      clearTimeout(autoScrollActivatorTimer);
      clearInterval(autoScroll);
    }
    

  }, [])

  useEffect(() => {
    autoScrollActivatorTimer = setTimeout(() => {
      autoScroll = setInterval(() => {
        autoScrollYep();
      }, 50)
    }, 500);
  }, [scrollRef])

  const autoScrollYep = () => {

    if (scrollIsntCloseToAnyThreshold(scrollRef.current, thresHolds)) {
      if (scrollRef.current < thresHolds[4])
        setScrollExpanded(-0.07);
    } else {
      clearInterval(autoScroll);
    }
  }

  const setScrollDirectionExpanded = (newValue: number) => {
    if (scrollDirectionRef.current == null) {
      if (newValue > 0) {
        setScrollDirection(-1);
        scrollDirectionRef.current = -1;
      }
      if (newValue < 0) {
        setScrollDirection(1);
        scrollDirectionRef.current = 1;
      }
    }
  }

  const setScrollExpanded = (newValue: number) => {
    if (newValue > 0 && scrollRef.current < 1) {
      setScroll(prev => (0.1));
      scrollRef.current = 0.1;
      return;
    }
    if (newValue < 0 && scrollRef.current > 29) {
      setScroll(prev => (29.9));
      scrollRef.current = 29.9;
      return;
    }

    // if (scrollRef.current > thresHolds[2] && scrollRef.current < thresHolds[3]) {
    //   setScroll(prev => {
    //     return (prev - newValue / tech.length * 7)
    //   });
    //   scrollRef.current = scrollRef.current - newValue / tech.length * 7;
    // } else {
      setScroll(prev => {
        return (prev - newValue)
      });
      scrollRef.current = scrollRef.current - newValue;
    // }


  };
  const [currentTouch, setCurrentTouch] = useState<{ Y: number, X: number }>({ Y: 0.1, X: 0.1 });
  const touchStateRef = useRef(currentTouch);
  const setCurrentTouchExpanded = (Y: number, X: number) => {
    setCurrentTouch({ X: X, Y: Y });
    touchStateRef.current = ({ X: X, Y: Y });
  };
  let scrollDoneTimer: NodeJS.Timeout;


  const onScrollFinished = () => {
    console.log("scroll finished");
    const newScroll = scroll;
    const threshold = getClosestThreshold(newScroll);
    if (threshold) setScroll(threshold + 2.5);
  }

  const scroller: (e: any) => any = (e: any) => {
    clearTimeout(scrollDoneTimer);

    // if (scrollRef.current < thresHolds[2] || scrollRef.current > thresHolds[3]) {

      const Y = e.wheelDeltaY;
      const X = e.wheelDeltaX;
      const newValue = scrollCalculator(Y, X);
      setScrollDirectionExpanded(newValue);
      if (newValue < 0.45 && newValue > -0.45) {
        if (scrollDirectionRef.current != null) {
          setScrollExpanded(newValue * scrollDirectionRef.current);
        }
      }
    // }
    // scrollDoneTimer = setTimeout(() => {
    //   onScrollFinished();
    // }, 300)

  }

  const workPageScroller: (scroll: number) => void = (scroll) => {
    clearTimeout(scrollDoneTimer);

    const newValue = scrollCalculator(scroll, 0);
    setScrollDirectionExpanded(newValue);
    if (newValue < 0.45 && newValue > -0.45) {
      if (scrollDirectionRef.current != null) {
        setScrollExpanded(newValue * scrollDirectionRef.current);
      }
    }
    // scrollDoneTimer = setTimeout(() => {
    //   onScrollFinished();
    // }, 300)

  }

  const jumpToScroll = (scroll: number) => {
    setScroll(scroll);
    scrollRef.current = scroll;
  }

  const mobileScroller = (e: TouchEvent) => {
    e.preventDefault();
    const Y = e.changedTouches[0].clientY;
    const X = e.changedTouches[0].clientX;
    clearTimeout(scrollDoneTimer);

    if (touchStateRef.current.Y - Y <= 30) {
      const newValue = getNewTouchScroll({ Y: touchStateRef.current.Y, X: touchStateRef.current.X }, { X: X, Y: Y })

      if (newValue < 0.45 && newValue > -0.45) {
        setScrollExpanded(-newValue);
      }
    }

    setCurrentTouchExpanded(Y, X);



    // scrollDoneTimer = setTimeout(() => {
    //   onScrollFinished();
    // }, 300)

  }


  const onChapterClickEventHandler = (position: number) => {
    const ok = getScrollPosition(position)
    setScroll(ok);
    scrollRef.current = ok;
  }


  useEffect(() => {
    window.addEventListener("wheel", scroller);
    window.addEventListener("touchmove", mobileScroller);

    return () => {
      window.removeEventListener("wheel", scroller);
      window.removeEventListener("touchmove", mobileScroller);
    }
  }, [])

  const mediaPort = GetMediaPort({ width, height });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", position: "absolute" }}>
      <Head>
        <title>anthon.tech</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@anthonwellsjo" />
        <meta name="twitter:title" content="Anthon Wellsj??" />
        <meta name="twitter:description" content="Swedish fullstack developer and devops engineer." />
        <meta name="twitter:image" content="http://anthon.tech/big-image.png" />
        <meta name="image" property="og:image" content="http://anthon.tech/big-image.png"></meta>
        <meta name="author" content="Carl Anthon Wellsj??"></meta>
        <meta name="description" property="og:description" content="Swedish fullstack developer and aspiring devops engineer. Loving the keyboard perspective of things."></meta>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/ReenieBeanie/ReenieBeanie.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Montserrat/Montserrat-Thin.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Montserrat/Montserrat-Bold.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Montserrat/Montserrat-ThinItalic.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <Canvas style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }}>
        <ambientLight />
        <spotLight castShadow={true} position={[100, 100, 100]} />
        <pointLight position={[100, 100, 100]} />
        <pointLight position={[100, 100, 100]} />
        <BlackSheet scroll={scroll} position={[0, 0, 0]} />
      </Canvas>

      <AppFrame mobile={mediaPort === MediaPort.mobile}>
        <PageWrapper marginTop={mediaPort == MediaPort.mobile ? "-25%": "-10%"} scroll={scroll} zone={[0, thresHolds[0]]}>
          <BorderAnim scroll={scroll} zone={[0 + 0.1, thresHolds[0] - 1]}>
            <FadeIn>
              <IntroPage />
            </FadeIn>
          </BorderAnim>
        </PageWrapper>
        <PageWrapper scroll={scroll} zone={[thresHolds[0] + 0.01, thresHolds[1]]}>
          <Title scroll={scroll} name="Bio" />
          <BorderAnim marginTop={mediaPort == MediaPort.desktop? "-10%": "-35%"} scroll={scroll} zone={[thresHolds[0] + 0.1, thresHolds[1] - 1]}>
            <FadeIn>
              <BioPage />
            </FadeIn>
          </BorderAnim>

        </PageWrapper>
        <PageWrapper scroll={scroll} zone={[thresHolds[1] + 0.01, thresHolds[2]]}>
          <Title scroll={scroll} name="Skills" />
          <div style={{ width: mediaPort === MediaPort.desktop ? "80%" : "90%", position: "relative", display:"flex", justifyContent:"center", padding: "5%" }}>
            <Skills {...{ tech }} techTypes={["Frontend", "Backend", "Devops"]} />
          </div>
        </PageWrapper>
        {/* <PageWrapper scroll={scroll} zone={[thresHolds[2] + 0.01, thresHolds[3]]}>
          <Title scroll={scroll} name="Work" />
          <Work scroller={workPageScroller} tech={tech} setScroll={jumpToScroll} {...{ work, scroll }} />
        </PageWrapper> */}
        <PageWrapper scroll={scroll} zone={[thresHolds[2] + 0.01, thresHolds[3]]}>
          <Title scroll={scroll} name="Social" />
          <Social />
        </PageWrapper>
        <IndexHolder zone={[2, thresHolds[5]]} scroll={scroll}>
          <Chapter onClickEvent={onChapterClickEventHandler} position={0} {...{ scroll }} />
          <Chapter onClickEvent={onChapterClickEventHandler} title={"bio"} position={calculatePosition(thresHolds[0], maxScroll)} {...{ scroll }} />
          <Chapter onClickEvent={onChapterClickEventHandler} title={"skills"} position={calculatePosition(thresHolds[1], maxScroll)} {...{ scroll }} />
          {/* <Chapter onClickEvent={onChapterClickEventHandler} title={"work"} position={calculatePosition(thresHolds[2], maxScroll)} {...{ scroll }} /> */}
          <Chapter onClickEvent={onChapterClickEventHandler} title={"social"} position={calculatePosition(thresHolds[2], maxScroll)} {...{ scroll }} />
          <Chapter onClickEvent={onChapterClickEventHandler} position={calculatePosition(thresHolds[3], maxScroll)} {...{ scroll }} />
        </IndexHolder>
      </AppFrame>
      <ScrollBar {...{ scroll }} />
          <pre style={{position:"fixed", bottom:0, right: "20px", color: "lightgrey"}}>Build: {builtOn}</pre>
    </div>
  )
}

export default Home



export async function getStaticProps() {

  let tech = await fetch(`https://2nwawwcw.api.sanity.io/v2021-06-07/data/query/production?query=*[_type=='tech']{
    title,
    _id,
    description,
    link,
    techType[]->{...}, 
  techlogo{asset->{path, url}}}`);
  const techData = await tech.json();
  let cat = await fetch("https://2nwawwcw.api.sanity.io/v2021-06-07/data/query/production?query=*[_type=='techType']");
  const catData = await cat.json();
  const catDataMapped = catData.result.map((r: any) => r.techType);
  let work = await fetch(`https://2nwawwcw.api.sanity.io/v2021-06-07/data/query/production?query=*[_type=='project']{
    ...,
    _id,
    tech[]->{title, _id},
    videoDesktop{asset->{path,url}},
    videoMobile{asset->{path,url}},
    description[]{
      ...,
    _type == "image" => {
      ...,
      asset->
    }
  }
    
  }`);
  const workData = await work.json();
  return {
    props: { builtOn: new Date().toLocaleString(), tech: techData.result, techTypes: catDataMapped, work: workData.result }, // will be passed to the page component as props
  }
}
