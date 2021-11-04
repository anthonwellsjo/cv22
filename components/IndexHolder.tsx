import React from 'react';

const IndexHolder: React.FC = ({ children }) => {
  return (
    <div style={{ position: "absolute", top: "100px", width: "100%", display: "flex", justifyContent: "space-around", backgroundColor: "rgba(256,256,256,0.2)", height: "50px", backdropFilter: "blur(10px)", borderBottom: "1px solid grey", borderTop: "1px solid grey", }}>
      <div style={{ position: "absolute", width: "50%" }}>
        {children}
      </div>
    </div>
  )
}

export default IndexHolder;