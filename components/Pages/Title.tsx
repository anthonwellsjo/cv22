import React from 'react';
import { a } from '@react-spring/web'

interface props {
  name: string,
  scroll: number
}

const Title: React.FC<props> = ({ name }) => {
  return (
    <a.h2 style={{ position: "absolute", top: "0px", fontFamily: "Handwriting", fontSize: "90px", transform: "rotate(5deg)" }}>{name}</a.h2>
  )
}

export default Title;