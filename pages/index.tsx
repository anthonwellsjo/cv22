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
import { thresHolds } from '../components/utils/app-config'
import Title from '../components/Pages/Title'
import TextWrapper from '../components/Pages/TextWrapper'

const Home: NextPage = () => {
  const divRef: React.LegacyRef<HTMLDivElement> | undefined = createRef();
  const [scroll, setScroll] = useState(0);
  const scrollRef = useRef(scroll);
  const setScrollExpanded = (newValue: number) => {
    console.log("new value", newValue);
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
    setScroll(prev => (prev - newValue));
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
    console.log("nromal scroll", newValue);
    setScrollExpanded(newValue);


    // scrollDoneTimer = setTimeout(() => {
    //   onScrollFinished();
    // }, 300)

  }


  function mobileScroller(this: HTMLDivElement, e: TouchEvent) {
    e.preventDefault();
    const Y = e.changedTouches[0].clientY;
    const X = e.changedTouches[0].clientX;
    console.log("scrolling!!!", Y, X);
    clearTimeout(scrollDoneTimer);
    console.log("new touch", Y, X);

    if (touchStateRef.current.Y - Y <= 30) {
      const newValue = getNewTouchScroll({ Y: touchStateRef.current.Y, X: touchStateRef.current.X }, { X: X, Y: Y })

      console.log("mobile scroll", newValue);
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
    setScroll(getScrollPosition(position));
    scrollRef.current = position;
  }


  useEffect(() => {
    divRef.current?.addEventListener("wheel", scroller);
    divRef.current?.addEventListener("touchmove", mobileScroller);

    return () => {
      divRef.current?.removeEventListener("wheel", scroller);
      divRef.current?.removeEventListener("touchmove", mobileScroller);
    }
  }, [])

  return (
    <div ref={divRef != null ? divRef : null} style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", position: "absolute" }}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/ReenieBeanie/ReenieBeanie.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>

      <div style={{ width: "90%", maxWidth: "1000px", minWidth: "300px", backgroundColor: "red", height: "100vh", }}>
        <Canvas style={{ width: "100%", backgroundColor: "white" }}>
          <ambientLight />
          <spotLight castShadow={true} position={[100, 100, 100]} />
          <pointLight position={[100, 100, 100]} />
          <pointLight position={[100, 100, 100]} />
          <BlackSheet scroll={scroll} position={[0, 0, 0]} />
        </Canvas>
      </div>

      <PageWrapper scroll={scroll} zone={[0, thresHolds[0]]}>
        <IntroPage />
        {/* <TextWrapper scroll={scroll} zone={[0, thresHolds[0]]} > */}
        <div style={{ width: "2px", height: "2px", backgroundColor: "black" }} />
        <span>{new Date().toLocaleString()}</span>

        {/* </TextWrapper> */}
      </PageWrapper>
      <PageWrapper scroll={scroll} zone={[thresHolds[0] + 0.01, thresHolds[1]]}>
        <Title scroll={scroll} name="Bio" />
        <TextWrapper scroll={scroll} zone={[thresHolds[0] + 0.01, thresHolds[1]]}>
          <BioPage />
        </TextWrapper>
      </PageWrapper>
      <PageWrapper scroll={scroll} zone={[thresHolds[1] + 0.01, thresHolds[2]]}>
        <Title scroll={scroll} name="Skills" />
        <TextWrapper scroll={scroll} zone={[thresHolds[1] + 0.01, thresHolds[2]]}>
          <div style={{ position: "absolute", top: "100%" }}>
            <strong>Lorem, ipsum.</strong>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore quidem placeat fugiat eveniet ratione earum natus, nostrum assumenda ipsa ab porro tempore veniam aliquam voluptate vitae quasi? Nisi, praesentium nemo?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos commodi corporis aperiam autem et consequatur magni sint rem illum repellat, reprehenderit, quia dolore, voluptate at beatae deserunt? Autem, quisquam id sit necessitatibus magnam impedit earum, ipsa quidem voluptate eligendi deleniti.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, aperiam!</p>
          </div>
        </TextWrapper>
      </PageWrapper>
      <PageWrapper scroll={scroll} zone={[thresHolds[2] + 0.01, thresHolds[3]]}>
        <Title scroll={scroll} name="Curriculum" />
        <TextWrapper scroll={scroll} zone={[thresHolds[2] + 0.01, thresHolds[3]]}>
          <div style={{ position: "absolute", top: "100%" }}>
            <strong>Lorem, ipsum.</strong>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore quidem placeat fugiat eveniet ratione earum natus, nostrum assumenda ipsa ab porro tempore veniam aliquam voluptate vitae quasi? Nisi, praesentium nemo?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos commodi corporis aperiam autem et consequatur magni sint rem illum repellat, reprehenderit, quia dolore, voluptate at beatae deserunt? Autem, quisquam id sit necessitatibus magnam impedit earum, ipsa quidem voluptate eligendi deleniti.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, aperiam!</p>
          </div>
        </TextWrapper>
      </PageWrapper>
      <PageWrapper scroll={scroll} zone={[thresHolds[3] + 0.01, thresHolds[4]]}>
        <Title scroll={scroll} name="Social" />
        <TextWrapper scroll={scroll} zone={[thresHolds[3] + 0.01, thresHolds[4]]}>
          <div style={{ position: "absolute", top: "100%" }}>
            <strong>Lorem, ipsum.</strong>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore quidem placeat fugiat eveniet ratione earum natus, nostrum assumenda ipsa ab porro tempore veniam aliquam voluptate vitae quasi? Nisi, praesentium nemo?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos commodi corporis aperiam autem et consequatur magni sint rem illum repellat, reprehenderit, quia dolore, voluptate at beatae deserunt? Autem, quisquam id sit necessitatibus magnam impedit earum, ipsa quidem voluptate eligendi deleniti.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, aperiam!</p>
          </div>
        </TextWrapper>
      </PageWrapper>
      <IndexHolder>
        <ScrollBar {...{ scroll }} />
        <Chapter onClickEvent={onChapterClickEventHandler} position={5} {...{ scroll }} />
        <Chapter onClickEvent={onChapterClickEventHandler} title={"bio"} position={20} {...{ scroll }} />
        <Chapter onClickEvent={onChapterClickEventHandler} title={"skills"} position={40} {...{ scroll }} />
        <Chapter onClickEvent={onChapterClickEventHandler} title={"cv"} position={60} {...{ scroll }} />
        <Chapter onClickEvent={onChapterClickEventHandler} title={"social"} position={80} {...{ scroll }} />
        <Chapter onClickEvent={onChapterClickEventHandler} position={95} {...{ scroll }} />
      </IndexHolder>
    </div>
  )
}

export default Home



