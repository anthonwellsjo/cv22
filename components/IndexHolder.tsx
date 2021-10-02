import React from 'react';

const IndexHolder: React.FC = ({ children }) => {
  return (
    <div style={{ position: "fixed", left: 0, bottom: 0, right: 0, }}>
      {children}
    </div>
  )
}

export default IndexHolder;