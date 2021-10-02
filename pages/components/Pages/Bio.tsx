import React, { useEffect, useState } from 'react';



const BioPage: React.FC = () => {
  const [text, setText] = useState("");
  const toText = `Lorem ipsum dolor sit amet 
  consectetur adipisicing elit. Veniam sit provident 
  porro accusamus nulla ad vel sapiente eum maxime perferendis, 
  tempore impedit aliquam natus, ipsam earum, hic recusandae ullam. 
  Consectetur!`;

  useEffect(() => {
    toText.split("").forEach((c, i) => {
      setTimeout(() => {
        setText(prev => (prev + c))
      }, i * 20)
    })

  }, [])


  return (
    <div style={{ position: "absolute" }}>
      <h2>Bio</h2>
      <div style={{ maxWidth: "250px", wordBreak: "break-all" }}>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default BioPage;