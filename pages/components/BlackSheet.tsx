import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useSpring, a } from '@react-spring/three'

const thresHolds = [5, 10, 15, 20, 25, 30];

const getScale = (scroll: number) => {
  if (scroll <= thresHolds[0]) {
    return [5, 0.1, 5];
  }
  if (scroll < thresHolds[1]) {
    return [2.5, 15, 5];
  }
  if (scroll < thresHolds[2]) {
    return [4, 25, 1];
  }
  if (scroll < thresHolds[3]) {
    return [20, 20, 1];
  }
  if (scroll < thresHolds[4]) {
    return [35, 0.1, 5];
  }
  return [5, 5, 5]
}
const getColor = (scroll: number) => {
  if (scroll <= thresHolds[0]) {
    return "black";
  }
  if (scroll < thresHolds[1]) {
    return "yellow";
  }
  if (scroll < thresHolds[2]) {
    return "red";
  }
  if (scroll < thresHolds[3]) {
    return "pink";
  }
  if (scroll < thresHolds[4]) {
    return "green";
  }
  return "black";
}

const getPosition = (scroll: number) => {
  if (scroll > thresHolds[0]) {
    return [0, 0, -2];
  }
  return [0, 0, 0]
}

const getRotation = (scroll: number) => {
  if (scroll <= thresHolds[0]) {
    return [0, 0, 0];
  }
  if (scroll < thresHolds[1]) {
    return [0, 0, 1];
  }
  if (scroll < thresHolds[2]) {
    return [0, 0, 2];
  }
  if (scroll < thresHolds[3]) {
    return [0, 0, 0];
  }
  if (scroll < thresHolds[4]) {
    return [0, 0, 0];
  }
  return [0, 0, 0]
}

interface heyprops {
  scroll: number,

}

type proppy = heyprops & JSX.IntrinsicElements['mesh'];

export default function BlackSheet({ scroll, }: proppy) {
  const style = useSpring({
    rotation: getRotation(scroll),
    position: getPosition(scroll),
    scale: getScale(scroll),
    color: getColor(scroll),
    config: {
      mass: 20,
      friction: 100,
      tension: 100
    }
  })
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // useFrame((state, delta) => (ref.current.rotation.x += 0.01))

  return (
    <a.mesh
      ref={ref}
      rotation={style.rotation as any}
      position={style.position as any}
      scale={style.scale as any}
    >
      <spotLight position={[1, 1, -10]} scale={5} />
      <boxGeometry args={[1, 1, 1]} />
      <a.meshPhysicalMaterial color={style.color as any} />
    </a.mesh>
  )
}