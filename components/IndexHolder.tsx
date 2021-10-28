import React from 'react';

const IndexHolder: React.FC = ({ children }) => {
  return (
    <div style={{position: "absolute", top: "100px", width: "100%", right: 0, display: "flex", justifyContent: "center", backgroundColor: "rgba(256,256,256,0.4)", height: "50px", backdropFilter: "blur(10px)", borderBottom: "2px solid grey", borderTop: "2px solid grey",}}>
      <div style={{position:"absolute", width: "50%", right: 0 }}>
        {children}
      </div>
    </div>
  )
}

export default IndexHolder;