import React from 'react';
import useObserver from '../hooks/observer';

export default ({ className, children, percent, style }) => {
  const [observe, setObserve] = useObserver(percent ? percent / 100 : null);

  return(
    <div
      style={style}
      ref={el => setObserve(el)}
      className={observe && className}
    >
      {children}
    </div>
  )
}
