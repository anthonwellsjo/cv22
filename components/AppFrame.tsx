import React from 'react';

interface props {
  mobile: boolean,
  children: React.ReactNode
}

const AppFrame: React.FC<props> = ({ children, mobile }) => {
  return (
    <div style={{ position: "relative", padding: 0, margin: 0, width: mobile ? "100%" : "80%", minWidth: "300px", height: "100%", overflow: "hidden" }}>
      {children}
    </div>
  )
}

export default AppFrame;