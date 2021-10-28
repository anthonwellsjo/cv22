import React from 'react';

const AppFrame: React.FC = ({ children }) => {
  return (
    <div style={{ position: "absolute", right: 0, padding: 0, margin: 0, width: "90%",minWidth: "300px", height: "100%", outline: "2px solid black", overflow: "hidden" }}>
      {children}
    </div>
  )
}

export default AppFrame;