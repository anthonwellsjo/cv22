import React from 'react';

const AppFrame: React.FC = ({ children }) => {
  return (
    <div style={{ position: "absolute", padding: 0, margin: 0, width: "80%",minWidth: "300px", height: "100%", overflow: "hidden" }}>
      {children}
    </div>
  )
}

export default AppFrame;