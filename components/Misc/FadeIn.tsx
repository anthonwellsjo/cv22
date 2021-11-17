import React from 'react';
import { a, useSpring } from '@react-spring/web';

const FadeIn: React.FC = ({ children }) => {
  const styles = useSpring({
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  })
  return (
    <a.div style={styles}>
      {children}
    </a.div>
  )
}

export default FadeIn;