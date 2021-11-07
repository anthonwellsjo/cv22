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
import TextWrapper from '../components/Pages/TextWrapper'
import Skills from '../components/Pages/Skills'
import AppFrame from '../components/AppFrame'
import BorderAnim from '../components/Misc/BorderAnimations/BorderAnim'
import { useViewport } from '../components/Misc/ViewPort'
import GetMediaPort from '../components/Misc/GetMediaPort'
import { MediaPort } from '../enums'
import { calculatePosition, scrollIsntCloseToAnyThreshold } from '../components/utils/utils'

const Home: NextPage = ({ builtOn, tech, techTypes }: any) => {
  const [scrollDirection, setScrollDirection] = useState<1 | -1 | null>(null)
  const scrollDirectionRef = useRef(scrollDirection);
  const [scroll, setScroll] = useState(0);
  const scrollRef = useRef(scroll);
  const { width, height } = useViewport();
  // const [autoScrollActivatorTimer, setAutoScrollActivatorTimer] = useState<NodeJS.Timeout | undefined>();
  const [autoSroll, setAutoScroll] = useState<NodeJS.Timer | undefined>();


  useEffect(() => {
    let autoScrollActivatorTimer: NodeJS.Timeout;
    let autoScroll: NodeJS.Timer;
    autoScrollActivatorTimer = setTimeout(() => {
      autoScroll = setInterval(() => {
        autoScrollYep();
      }, 50)
    }, 2000);

    return () => {
      clearTimeout(autoScrollActivatorTimer);
      clearInterval(autoScroll);
    }
  }, [])




  const autoScrollYep = () => {

    if (scrollIsntCloseToAnyThreshold(scrollRef.current, thresHolds)) {
      setScrollExpanded(-0.07);
    } else {
      console.log("no scroll");
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
    setScroll(prev => {

      return (prev - newValue)
    });
    scrollRef.current = scrollRef.current - newValue;

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
    e.preventDefault();
    clearTimeout(scrollDoneTimer);

    const Y = e.wheelDeltaY;
    const X = e.wheelDeltaX;
    const newValue = scrollCalculator(Y, X);
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
        <meta name="Anthon Wellsjö's online portfolio website" content="An SPA created with Next.js" />
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

      <AppFrame>
        <PageWrapper marginTop={"-100px"} scroll={scroll} zone={[0, thresHolds[0]]}>
          <BorderAnim scroll={scroll} zone={[0 + 0.1, thresHolds[0] - 1]}>
            <IntroPage />
          </BorderAnim>
          {/* <TextWrapper scroll={scroll} zone={[0, thresHolds[0]]} > */}
          <div style={{ width: "2px", height: "2px", backgroundColor: "black" }} />
          <pre>Build: {builtOn}</pre>
          {/* </TextWrapper> */}
        </PageWrapper>
        <PageWrapper marginTop={mediaPort === MediaPort.mobile ? "-150px" : "auto"} scroll={scroll} zone={[thresHolds[0] + 0.01, thresHolds[1]]}>
          <Title scroll={scroll} name="Bio" />
          <BorderAnim scroll={scroll} zone={[thresHolds[0] + 0.1, thresHolds[1] - 1]}>
            <BioPage />
          </BorderAnim>

        </PageWrapper>
        <PageWrapper scroll={scroll} zone={[thresHolds[1] + 0.01, thresHolds[2]]}>
          <Title scroll={scroll} name="Skills" />
          <TextWrapper scroll={scroll} zone={[thresHolds[1] + 0.01, thresHolds[2]]}>
            <Skills {...{ tech, techTypes }} />
          </TextWrapper>
        </PageWrapper>
        <PageWrapper scroll={scroll} zone={[thresHolds[2] + 0.01, thresHolds[3]]}>
          <Title scroll={scroll} name="Curriculum" />
          <TextWrapper scroll={scroll} zone={[thresHolds[2] + 0.01, thresHolds[3]]}>
            <div style={{ position: "absolute", top: "130%", width: "90%" }}>
              <strong>Lorem, ipsum.</strong>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.Labore quidem placeat fugiat eveniet ratione earum natus, nostrum assumenda ipsa ab porro tempore veniam aliquam voluptate vitae quasi?Nisi, praesentium nemo?</p>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.Dignissimos commodi corporis aperiam autem et consequatur magni sint rem illum repellat, reprehenderit, quia dolore, voluptate at beatae deserunt?Autem, quisquam id sit necessitatibus magnam impedit earum, ipsa quidem voluptate eligendi deleniti.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.Deserunt, aperiam!</p>
            </div>
          </TextWrapper>
        </PageWrapper>
        <PageWrapper scroll={scroll} zone={[thresHolds[3] + 0.01, thresHolds[4]]}>
          <Title scroll={scroll} name="Social" />
          <TextWrapper scroll={scroll} zone={[thresHolds[3] + 0.01, thresHolds[4]]}>
            <div style={{ position: "absolute", top: "155%", width: "90%" }}>
              <strong>Lorem, ipsum.</strong>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.Labore quidem placeat fugiat eveniet ratione earum natus, nostrum assumenda ipsa ab porro tempore veniam aliquam voluptate vitae quasi?Nisi, praesentium nemo?</p>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.Dignissimos commodi corporis aperiam autem et consequatur magni sint rem illum repellat, reprehenderit, quia dolore, voluptate at beatae deserunt?Autem, quisquam id sit necessitatibus magnam impedit earum, ipsa quidem voluptate eligendi deleniti.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.Deserunt, aperiam!</p>
            </div>
          </TextWrapper>
        </PageWrapper>
        <IndexHolder zone={[2, thresHolds[5]]} scroll={scroll}>
          <Chapter onClickEvent={onChapterClickEventHandler} position={0} {...{ scroll }} />
          <Chapter onClickEvent={onChapterClickEventHandler} title={"bio"} position={calculatePosition(thresHolds[0], maxScroll)} {...{ scroll }} />
          <Chapter onClickEvent={onChapterClickEventHandler} title={"skills"} position={calculatePosition(thresHolds[1], maxScroll)} {...{ scroll }} />
          <Chapter onClickEvent={onChapterClickEventHandler} title={"cv"} position={calculatePosition(thresHolds[2], maxScroll)} {...{ scroll }} />
          <Chapter onClickEvent={onChapterClickEventHandler} title={"social"} position={calculatePosition(thresHolds[3], maxScroll)} {...{ scroll }} />
          <Chapter onClickEvent={onChapterClickEventHandler} position={calculatePosition(thresHolds[4], maxScroll)} {...{ scroll }} />
        </IndexHolder>
      </AppFrame>
      <ScrollBar {...{ scroll }} />
    </div>
  )
}

export default Home



export async function getStaticProps() {

  let tech = await fetch(`https://2nwawwcw.api.sanity.io/v2021-06-07/data/query/production?query=*[_type=='tech']{
    title, 
    techType[]->{techType}, 
  techlogo{asset->{path, url}}}`);
  const techData = await tech.json();
  let cat = await fetch("https://2nwawwcw.api.sanity.io/v2021-06-07/data/query/production?query=*[_type=='techType']");
  const catData = await cat.json();
  const catDataMapped = catData.result.map((r: any) => r.techType);
  return {
    props: { builtOn: new Date().toLocaleString(), tech: techData.result, techTypes: catDataMapped }, // will be passed to the page component as props
  }
}